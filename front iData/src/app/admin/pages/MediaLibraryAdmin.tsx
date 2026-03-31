import { Image, Upload, Folder, Search } from 'lucide-react';

export function MediaLibraryAdmin() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-light text-gray-900">Biblioteca de Medios</h1>
          <p className="mt-2 text-sm text-gray-600">Gestiona imágenes, videos y archivos del sitio</p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
          <Upload className="w-4 h-4" />
          Subir archivos
        </button>
      </div>

      <div className="bg-white rounded-xl border border-gray-200 p-12">
        <div className="text-center text-gray-500">
          <Image className="w-16 h-16 mx-auto mb-4 text-gray-300" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">Biblioteca de medios</h3>
          <p className="text-sm">Esta funcionalidad se integrará con el backend de Lovable</p>
          <p className="text-sm mt-1">Por ahora, las imágenes se gestionan directamente en el código</p>
        </div>
      </div>
    </div>
  );
}
