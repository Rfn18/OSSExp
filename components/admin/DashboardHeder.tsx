export function DashboardHeader({
  title,
  description,
  isGreeting = false,
  isDate = false,
}: {
  title: string;
  description: string;
  isGreeting?: boolean;
  isDate?: boolean;
}) {
  const now = new Date();
  const dateStr = now.toLocaleDateString("id-ID", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  return (
    <div
      className="flex flex-col sm:flex-row sm:items-center
      justify-between gap-1 mb-7 w-full"
    >
      <div className="w-full">
        <h1 className="text-xl font-semibold text-gray-900">{title}</h1>
        <p className="text-xs text-gray-400 mt-0.5">
          {isDate ? dateStr : description}
        </p>
      </div>
      {isGreeting && (
        <div className="w-full flex flex-col justify-end sm:items-end">
          <h1 className="text-xl font-semibold ">
            Morning, <span className="text-gradient">Fasterino!</span>
          </h1>
          <p className="text-xs text-gray-400 mt-0.5">Welcome back</p>
        </div>
      )}
    </div>
  );
}
