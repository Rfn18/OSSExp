export function Divider() {
  return (
    <div className="flex items-center gap-3 w-full my-8">
      <div className="flex-1 h-px bg-gray-200" />
      <div className="h-1.5 w-1.5 rounded-full bg-blue-400" />
      <div className="flex-1 h-px bg-gray-200" />
    </div>
  );
}