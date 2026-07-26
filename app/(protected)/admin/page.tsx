import {
  Calendar,
  FileText,
  Users,
  Activity,
  TrendingUp,
  TrendingDown,
} from "lucide-react";
import UserTrafficChart from "@/components/admin/userTrafficChart";
import LatestEventsTable from "@/components/admin/latestEventsTable";
import { DashboardHeader } from "@/components/admin/dashboardHeader";

interface CardItem {
  title: string;
  value: string;
  growth: string;
  icon: React.ElementType;
  color: "blue" | "violet" | "emerald" | "amber";
}

const COLOR_MAP = {
  blue: {
    icon: "bg-blue-50 text-blue-600",
    accent: "from-blue-500/5",
    border: "border-blue-100",
    growth: "text-emerald-600 bg-emerald-50",
  },
  violet: {
    icon: "bg-violet-50 text-violet-600",
    accent: "from-violet-500/5",
    border: "border-violet-100",
    growth: "text-emerald-600 bg-emerald-50",
  },
  emerald: {
    icon: "bg-emerald-50 text-emerald-600",
    accent: "from-emerald-500/5",
    border: "border-emerald-100",
    growth: "text-emerald-600 bg-emerald-50",
  },
  amber: {
    icon: "bg-amber-50 text-amber-600",
    accent: "from-amber-500/5",
    border: "border-amber-100",
    growth: "text-emerald-600 bg-emerald-50",
  },
} as const;

const cardItems: CardItem[] = [
  {
    title: "Events",
    value: "100",
    growth: "+12%",
    icon: Calendar,
    color: "blue",
  },
  {
    title: "Documentations",
    value: "100",
    growth: "+12%",
    icon: FileText,
    color: "violet",
  },
  {
    title: "Users",
    value: "100",
    growth: "+8%",
    icon: Users,
    color: "emerald",
  },
  {
    title: "Weekly Traffic",
    value: "100",
    growth: "-3%",
    icon: Activity,
    color: "amber",
  },
];

function StatCard({ item }: { item: CardItem }) {
  const cfg = COLOR_MAP[item.color];
  const Icon = item.icon;
  const isNegative = item.growth.startsWith("-");
  const GrowthIcon = isNegative ? TrendingDown : TrendingUp;

  return (
    <div
      className={`relative overflow-hidden bg-white rounded-2xl border
        ${cfg.border} p-5 flex flex-col gap-4
        hover:shadow-md hover:-translate-y-0.5
        transition-all duration-200 ease-out`}
    >
      <div
        className={`absolute inset-0 bg-gradient-to-br ${cfg.accent}
        to-transparent pointer-events-none`}
      />

      {/* top row: icon + growth */}
      <div className="flex items-start justify-between relative">
        <div
          className={`w-10 h-10 rounded-xl flex items-center justify-center
          shrink-0 ${cfg.icon}`}
        >
          <Icon size={18} />
        </div>

        <span
          className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-lg
            text-xs font-semibold
            ${
              isNegative
                ? "text-red-600 bg-red-50"
                : "text-emerald-600 bg-emerald-50"
            }`}
        >
          <GrowthIcon size={11} />
          {item.growth}
        </span>
      </div>

      <div className="relative">
        <p className="text-2xl font-bold text-gray-900 tabular-nums leading-none">
          {item.value}
        </p>
        <p className="text-xs text-gray-400 font-medium mt-1.5">{item.title}</p>
      </div>
    </div>
  );
}

export default function AdminDashboard() {
  return (
    <div className="w-auto h-auto ">
      <DashboardHeader
        title="Overview"
        description="Welcome back"
        isGreeting={true}
        isDate={true}
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {cardItems.map((item, i) => (
          <StatCard key={i} item={item} />
        ))}
      </div>

      <UserTrafficChart />
      <LatestEventsTable />
    </div>
  );
}
