export function ActionButton({
  onClick,
  title,
  color,
  children,
}: {
  onClick?: () => void;
  title: string;
  color: "blue" | "amber" | "red" | "gray";
  children: React.ReactNode;
}) {
  const colorMap = {
    blue: "text-blue-600  hover:bg-blue-50  hover:text-blue-700",
    amber: "text-amber-600 hover:bg-amber-50 hover:text-amber-700",
    red: "text-red-500   hover:bg-red-50   hover:text-red-600",
    gray: "text-gray-500  hover:bg-gray-100 hover:text-gray-900",
  };
  return (
    <button
      onClick={onClick}
      title={title}
      className={`w-8 h-8 rounded-lg flex items-center justify-center transition-all duration-150 ${colorMap[color]}`}
    >
      {children}
    </button>
  );
}

export function StatusBadge({
  label,
  dotColor,
  badgeColor,
  textColor,
  borderColor,
  pulse = false,
}: {
  label: string;
  dotColor: string;
  badgeColor: string;
  textColor?: string;
  borderColor?: string;
  pulse?: boolean;
}) {
  return (
    <span
      className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium whitespace-nowrap
        ${badgeColor} ${textColor ?? ""} ${borderColor ?? ""}`}
    >
      <span
        className={`w-1.5 h-1.5 rounded-full ${dotColor} ${pulse ? "animate-pulse" : ""}`}
      />
      {label}
    </span>
  );
}
