import AVFoundation
import CoreImage
import CoreVideo
import Foundation

struct Config {
  let inputPath: String
  let outputPath: String
  let fps: Int32
  let targetWidth: Int
  let targetHeight: Int
  let fileType: AVFileType
}

enum ScriptError: Error {
  case invalidArguments
  case readerSetupFailed
  case writerSetupFailed
  case cannotCreateImage
  case cannotAppendFrame
}

func parseArgs() throws -> Config {
  let args = CommandLine.arguments
  guard args.count >= 6 else {
    throw ScriptError.invalidArguments
  }

  guard
    let fps = Int32(args[3]),
    let width = Int(args[4]),
    let height = Int(args[5])
  else {
    throw ScriptError.invalidArguments
  }

  return Config(
    inputPath: args[1],
    outputPath: args[2],
    fps: fps,
    targetWidth: width,
    targetHeight: height,
    fileType: args[2].lowercased().hasSuffix(".mov") ? .mov : .mp4
  )
}

func makePixelBuffer(
  from image: CIImage,
  pool: CVPixelBufferPool,
  context: CIContext,
  size: CGSize
) throws -> CVPixelBuffer {
  var maybeBuffer: CVPixelBuffer?
  CVPixelBufferPoolCreatePixelBuffer(nil, pool, &maybeBuffer)

  guard let pixelBuffer = maybeBuffer else {
    throw ScriptError.cannotAppendFrame
  }

  CVPixelBufferLockBaseAddress(pixelBuffer, [])
  defer { CVPixelBufferUnlockBaseAddress(pixelBuffer, []) }

  let clearRect = CGRect(origin: .zero, size: size)
  context.render(image, to: pixelBuffer, bounds: clearRect, colorSpace: CGColorSpaceCreateDeviceRGB())

  return pixelBuffer
}

func fitRect(source: CGSize, target: CGSize) -> CGRect {
  let sourceAspect = source.width / source.height
  let targetAspect = target.width / target.height

  if sourceAspect > targetAspect {
    let scaledHeight = target.width / sourceAspect
    let y = (target.height - scaledHeight) / 2
    return CGRect(x: 0, y: y, width: target.width, height: scaledHeight)
  }

  let scaledWidth = target.height * sourceAspect
  let x = (target.width - scaledWidth) / 2
  return CGRect(x: x, y: 0, width: scaledWidth, height: target.height)
}

func main() throws {
  let config = try parseArgs()
  let inputURL = URL(fileURLWithPath: config.inputPath)
  let outputURL = URL(fileURLWithPath: config.outputPath)
  try? FileManager.default.removeItem(at: outputURL)

  let asset = AVURLAsset(url: inputURL)
  let durationSeconds = CMTimeGetSeconds(asset.duration)
  guard durationSeconds.isFinite, durationSeconds > 0 else {
    throw ScriptError.readerSetupFailed
  }

  let frameCount = max(2, Int(durationSeconds * Double(config.fps)))
  let frameDuration = CMTime(value: 1, timescale: config.fps)
  let targetSize = CGSize(width: config.targetWidth, height: config.targetHeight)

  let generator = AVAssetImageGenerator(asset: asset)
  generator.appliesPreferredTrackTransform = true
  generator.maximumSize = targetSize
  generator.requestedTimeToleranceAfter = .zero
  generator.requestedTimeToleranceBefore = .zero

  let track = asset.tracks(withMediaType: .video).first
  let sourceSize = trackSize(track: track) ?? targetSize
  let drawRect = fitRect(source: sourceSize, target: targetSize)
  let ciContext = CIContext(options: [.cacheIntermediates: false])

  let writer = try AVAssetWriter(outputURL: outputURL, fileType: config.fileType)
  let outputSettings: [String: Any] = [
    AVVideoCodecKey: AVVideoCodecType.h264,
    AVVideoWidthKey: config.targetWidth,
    AVVideoHeightKey: config.targetHeight,
    AVVideoCompressionPropertiesKey: [
      AVVideoAverageBitRateKey: config.targetWidth >= 1600 ? 7_500_000 : 4_500_000,
      AVVideoProfileLevelKey: AVVideoProfileLevelH264HighAutoLevel,
      AVVideoMaxKeyFrameIntervalKey: config.fps * 2,
    ],
  ]

  let writerInput = AVAssetWriterInput(mediaType: .video, outputSettings: outputSettings)
  writerInput.expectsMediaDataInRealTime = false

  let sourceAttributes: [String: Any] = [
    kCVPixelBufferPixelFormatTypeKey as String: Int(kCVPixelFormatType_32BGRA),
    kCVPixelBufferWidthKey as String: config.targetWidth,
    kCVPixelBufferHeightKey as String: config.targetHeight,
    kCVPixelBufferCGImageCompatibilityKey as String: true,
    kCVPixelBufferCGBitmapContextCompatibilityKey as String: true,
  ]

  let adaptor = AVAssetWriterInputPixelBufferAdaptor(
    assetWriterInput: writerInput,
    sourcePixelBufferAttributes: sourceAttributes
  )

  guard writer.canAdd(writerInput) else {
    throw ScriptError.writerSetupFailed
  }
  writer.add(writerInput)

  guard writer.startWriting() else {
    throw ScriptError.writerSetupFailed
  }
  writer.startSession(atSourceTime: .zero)

  var images: [CIImage] = []
  images.reserveCapacity(frameCount)

  for index in 0..<frameCount {
    let progress = Double(index) / Double(frameCount - 1)
    let time = CMTime(seconds: durationSeconds * progress, preferredTimescale: 600)
    let cgImage = try generator.copyCGImage(at: time, actualTime: nil)
    let image = CIImage(cgImage: cgImage)
    let transformed = image.transformed(by: CGAffineTransform.identity)
    let background = CIImage(color: .black).cropped(to: CGRect(origin: .zero, size: targetSize))
    let scaled = transformed.transformed(by: CGAffineTransform(
      scaleX: drawRect.width / image.extent.width,
      y: drawRect.height / image.extent.height
    ))
    let translated = scaled.transformed(by: CGAffineTransform(translationX: drawRect.origin.x, y: drawRect.origin.y))
    images.append(translated.composited(over: background))
  }

  var presentationTime = CMTime.zero

  func append(image: CIImage) throws {
    guard writerInput.isReadyForMoreMediaData else {
      throw ScriptError.cannotAppendFrame
    }

    guard let pool = adaptor.pixelBufferPool else {
      throw ScriptError.cannotAppendFrame
    }

    let pixelBuffer = try makePixelBuffer(from: image, pool: pool, context: ciContext, size: targetSize)
    guard adaptor.append(pixelBuffer, withPresentationTime: presentationTime) else {
      throw ScriptError.cannotAppendFrame
    }
    presentationTime = CMTimeAdd(presentationTime, frameDuration)
  }

  for image in images {
    try append(image: image)
  }

  if images.count > 2 {
    for image in images.dropLast().dropFirst().reversed() {
      try append(image: image)
    }
  }

  writerInput.markAsFinished()

  let semaphore = DispatchSemaphore(value: 0)
  writer.finishWriting {
    semaphore.signal()
  }
  semaphore.wait()

  if writer.status != .completed {
    throw writer.error ?? ScriptError.writerSetupFailed
  }

  print("Generated \(outputURL.path)")
}

func trackSize(track: AVAssetTrack?) -> CGSize? {
  guard let track else { return nil }
  let naturalSize = track.naturalSize.applying(track.preferredTransform)
  return CGSize(width: abs(naturalSize.width), height: abs(naturalSize.height))
}

do {
  try main()
} catch ScriptError.invalidArguments {
  fputs("Usage: swift generatePingPongVideo.swift <input> <output> <fps> <width> <height>\n", stderr)
  exit(64)
} catch {
  fputs("Error: \(error.localizedDescription)\n", stderr)
  exit(1)
}
