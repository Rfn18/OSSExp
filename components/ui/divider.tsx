export function Divider() {
  return (
    <div className="flex items-center gap-3 px-8 sm:px-16 md:px-32 mt-8 sm:mt-10 mb-2 w-full max-w-4xl">
      <div className="flex-1 h-px bg-gray-200" />
      <div className="h-1.5 w-1.5 rounded-full bg-blue-400" />
      <div className="flex-1 h-px bg-gray-200" />
    </div>
  );
}
