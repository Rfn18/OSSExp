"use client";

import { useState, useMemo } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  TooltipProps,
} from "recharts";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Users, TrendingUp, TrendingDown, Activity } from "lucide-react";

// ─── Data ─────────────────────────────────────────────────────────────────────

const dailyData = Array.from({ length: 31 }, (_, i) => ({
  name: (i + 1).toString().padStart(2, "0"),
  user: Math.floor(Math.random() * 500) + 100,
  traffic: Math.floor(Math.random() * 1000) + 500,
}));

const monthlyData = [
  { name: "Jan", user: 4000, traffic: 8400 },
  { name: "Feb", user: 3000, traffic: 7398 },
  { name: "Mar", user: 2000, traffic: 9800 },
  { name: "Apr", user: 2780, traffic: 6908 },
  { name: "May", user: 1890, traffic: 4800 },
  { name: "Jun", user: 2390, traffic: 5800 },
  { name: "Jul", user: 3490, traffic: 7300 },
  { name: "Aug", user: 4200, traffic: 8400 },
  { name: "Sep", user: 3100, traffic: 6398 },
  { name: "Oct", user: 2500, traffic: 5800 },
  { name: "Nov", user: 2980, traffic: 7908 },
  { name: "Dec", user: 4890, traffic: 10800 },
];

const yearlyData = [
  { name: "2020", user: 14000, traffic: 34000 },
  { name: "2021", user: 23000, traffic: 53980 },
  { name: "2022", user: 32000, traffic: 69800 },
  { name: "2023", user: 42780, traffic: 83908 },
  { name: "2024", user: 51890, traffic: 104800 },
  { name: "2025", user: 61890, traffic: 124800 },
];

const MONTHS = [
  { value: "Jan", label: "Januari" },
  { value: "Feb", label: "Februari" },
  { value: "Mar", label: "Maret" },
  { value: "Apr", label: "April" },
  { value: "May", label: "Mei" },
  { value: "Jun", label: "Juni" },
  { value: "Jul", label: "Juli" },
  { value: "Aug", label: "Agustus" },
  { value: "Sep", label: "September" },
  { value: "Oct", label: "Oktober" },
  { value: "Nov", label: "November" },
  { value: "Dec", label: "Desember" },
];

const YEARS = ["2022", "2023", "2024", "2025"];

// ─── Helpers ──────────────────────────────────────────────────────────────────

function formatNumber(n: number) {
  if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(1)}M`;
  if (n >= 1_000) return `${(n / 1_000).toFixed(1)}K`;
  return n.toString();
}

function calcTrend(
  data: { user: number; traffic: number }[],
  key: "user" | "traffic",
) {
  if (data.length < 2) return 0;
  const last = data[data.length - 1][key];
  const prev = data[data.length - 2][key];
  return prev === 0 ? 0 : Math.round(((last - prev) / prev) * 100);
}

// ─── Custom Tooltip ───────────────────────────────────────────────────────────

function CustomTooltip({
  active,
  payload,
  label,
}: TooltipProps<number, string>) {
  if (!active || !payload?.length) return null;
  return (
    <div
      className="bg-white rounded-xl shadow-xl shadow-black/10 border border-gray-100
      p-3.5 min-w-[160px]"
    >
      <p className="text-[11px] font-semibold uppercase tracking-wider text-gray-400 mb-2.5">
        {label}
      </p>
      {payload.map((entry) => (
        <div
          key={entry.name}
          className="flex items-center justify-between gap-4 mb-1.5 last:mb-0"
        >
          <div className="flex items-center gap-1.5">
            <span
              className="w-2 h-2 rounded-full shrink-0"
              style={{ backgroundColor: entry.color }}
            />
            <span className="text-xs text-gray-500">{entry.name}</span>
          </div>
          <span className="text-xs font-semibold text-gray-900 tabular-nums">
            {formatNumber(entry.value as number)}
          </span>
        </div>
      ))}
    </div>
  );
}

// ─── Stat Card ─────────────────────────────────────────────────────────────────

function StatCard({
  label,
  value,
  trend,
  color,
  icon: Icon,
}: {
  label: string;
  value: number;
  trend: number;
  color: "blue" | "emerald";
  icon: React.ElementType;
}) {
  const isUp = trend >= 0;
  const colorMap = {
    blue: {
      icon: "bg-blue-50 text-blue-600",
      trend: isUp ? "text-emerald-600" : "text-red-500",
    },
    emerald: {
      icon: "bg-emerald-50 text-emerald-600",
      trend: isUp ? "text-emerald-600" : "text-red-500",
    },
  };

  return (
    <div
      className="flex items-center gap-3 px-4 py-3 rounded-xl bg-gray-50
      border border-gray-100 flex-1 min-w-0"
    >
      <div
        className={`w-9 h-9 rounded-lg flex items-center justify-center
        shrink-0 ${colorMap[color].icon}`}
      >
        <Icon size={16} />
      </div>
      <div className="min-w-0">
        <p className="text-[11px] text-gray-400 font-medium whitespace-nowrap">
          {label}
        </p>
        <div className="flex items-baseline gap-2 flex-wrap">
          <p className="text-base font-bold text-gray-900 tabular-nums leading-tight">
            {formatNumber(value)}
          </p>
          <span
            className={`text-[11px] font-semibold flex items-center gap-0.5
            ${colorMap[color].trend}`}
          >
            {isUp ? <TrendingUp size={11} /> : <TrendingDown size={11} />}
            {Math.abs(trend)}%
          </span>
        </div>
      </div>
    </div>
  );
}

// ─── Timeframe Pill ───────────────────────────────────────────────────────────

function TimeframePill({
  value,
  active,
  onClick,
  children,
}: {
  value: string;
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      onClick={onClick}
      className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all duration-150
        ${
          active
            ? "bg-white text-gray-900 shadow-sm ring-1 ring-gray-200/80"
            : "text-gray-500 hover:text-gray-700"
        }`}
    >
      {children}
    </button>
  );
}

export default function UserTrafficChart() {
  const [timeframe, setTimeframe] = useState("monthly");
  const [selectedMonth, setSelectedMonth] = useState("Jan");
  const [selectedYear, setSelectedYear] = useState("2024");

  const data = useMemo(() => {
    switch (timeframe) {
      case "daily":
        return dailyData;
      case "yearly":
        return yearlyData;
      default:
        return monthlyData;
    }
  }, [timeframe]);

  const totalUser = data.reduce((s, d) => s + d.user, 0);
  const totalTraffic = data.reduce((s, d) => s + d.traffic, 0);
  const userTrend = calcTrend(data, "user");
  const trafficTrend = calcTrend(data, "traffic");

  return (
    <div
      className=" w-full bg-white rounded-2xl border border-gray-100 shadow-sm
      overflow-hidden mt-6"
    >
      <div className="px-5 sm:px-6 pt-5 pb-4 border-b border-gray-100">
        <div
          className="flex flex-col sm:flex-row sm:items-start
          justify-between gap-4"
        >
          <div>
            <h2 className="text-base font-semibold text-gray-900 flex items-center gap-2">
              <Activity size={16} className="text-blue-500" />
              User &amp; Traffic Overview
            </h2>
            <p className="text-xs text-gray-400 mt-0.5">
              Monitor total users and traffic metrics over time
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2.5">
            <div className="flex items-center gap-2">
              {(timeframe === "daily" || timeframe === "monthly") && (
                <Select value={selectedMonth} onValueChange={setSelectedMonth}>
                  <SelectTrigger className="h-8 w-[110px] text-xs bg-white border-gray-200 rounded-lg">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {MONTHS.map((m) => (
                      <SelectItem
                        key={m.value}
                        value={m.value}
                        className="text-xs"
                      >
                        {m.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              )}

              <Select value={selectedYear} onValueChange={setSelectedYear}>
                <SelectTrigger className="h-8 w-[90px] text-xs bg-white border-gray-200 rounded-lg">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {YEARS.map((y) => (
                    <SelectItem key={y} value={y} className="text-xs">
                      {y}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="flex items-center gap-0.5 bg-gray-100 rounded-xl p-1">
              {[
                { value: "daily", label: "Harian" },
                { value: "monthly", label: "Bulanan" },
                { value: "yearly", label: "Tahunan" },
              ].map((tf) => (
                <TimeframePill
                  key={tf.value}
                  value={tf.value}
                  active={timeframe === tf.value}
                  onClick={() => setTimeframe(tf.value)}
                >
                  {tf.label}
                </TimeframePill>
              ))}
            </div>
          </div>
        </div>

        <div className="flex gap-3 mt-4">
          <StatCard
            label="Total User"
            value={totalUser}
            trend={userTrend}
            color="blue"
            icon={Users}
          />
          <StatCard
            label="Total Traffic"
            value={totalTraffic}
            trend={trafficTrend}
            color="emerald"
            icon={Activity}
          />
        </div>
      </div>

      <div className="flex items-center gap-4 px-5 sm:px-6 pt-4 pb-0">
        {[
          { color: "#3b82f6", label: "Total User" },
          { color: "#10b981", label: "Total Traffic" },
        ].map(({ color, label }) => (
          <div key={label} className="flex items-center gap-1.5">
            <span
              className="w-5 h-0.5 rounded-full inline-block"
              style={{ backgroundColor: color }}
            />
            <span className="text-xs text-gray-500">{label}</span>
          </div>
        ))}
      </div>

      <div className="h-[280px] sm:h-[340px] px-2 pb-4 pt-2">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={data}
            margin={{ top: 10, right: 12, bottom: 0, left: -10 }}
          >
            <CartesianGrid
              strokeDasharray="3 3"
              vertical={false}
              stroke="#F3F4F6"
            />
            <XAxis
              dataKey="name"
              axisLine={false}
              tickLine={false}
              tick={{ fill: "#9CA3AF", fontSize: 11 }}
              dy={10}
            />
            <YAxis
              axisLine={false}
              tickLine={false}
              tick={{ fill: "#9CA3AF", fontSize: 11 }}
              tickFormatter={formatNumber}
              width={40}
            />
            <Tooltip
              content={<CustomTooltip />}
              cursor={{
                stroke: "#E5E7EB",
                strokeWidth: 1,
                strokeDasharray: "4 2",
              }}
            />
            <Line
              type="monotone"
              name="Total User"
              dataKey="user"
              stroke="#3b82f6"
              strokeWidth={2.5}
              dot={false}
              activeDot={{ r: 5, strokeWidth: 0, fill: "#3b82f6" }}
            />
            <Line
              type="monotone"
              name="Total Traffic"
              dataKey="traffic"
              stroke="#10b981"
              strokeWidth={2.5}
              dot={false}
              activeDot={{ r: 5, strokeWidth: 0, fill: "#10b981" }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
