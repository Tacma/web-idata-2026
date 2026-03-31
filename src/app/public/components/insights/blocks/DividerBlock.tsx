export function DividerBlockComponent() {
  return (
    <div className="my-12">
      <div className="flex items-center gap-4">
        <div className="flex-1 h-px bg-gradient-to-r from-transparent via-gray-300 to-transparent" />
        <div className="flex gap-1">
          <div className="w-1.5 h-1.5 rounded-full bg-purple-400" />
          <div className="w-1.5 h-1.5 rounded-full bg-purple-300" />
          <div className="w-1.5 h-1.5 rounded-full bg-purple-200" />
        </div>
        <div className="flex-1 h-px bg-gradient-to-r from-transparent via-gray-300 to-transparent" />
      </div>
    </div>
  );
}
