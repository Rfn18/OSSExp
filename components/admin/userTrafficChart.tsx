"use client";

import { useState, useMemo } from "react";
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
} from "recharts";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Users,
  TrendingUp,
  TrendingDown,
  Activity,
  ChartLine,
  ChartBar,
} from "lucide-react";
import {
  ChartContainer,
  ChartConfig,
  ChartTooltip,
  ChartTooltipContent,
} from "../ui/chart";

// ─── Data ─────────────────────────────────────────────────────────────────────

const dailyData = [
  { name: "01", user: 320, traffic: 780 },
  { name: "02", user: 410, traffic: 950 },
  { name: "03", user: 280, traffic: 690 },
  { name: "04", user: 390, traffic: 880 },
  { name: "05", user: 450, traffic: 1020 },
  { name: "06", user: 500, traffic: 1150 },
  { name: "07", user: 470, traffic: 1080 },
  { name: "08", user: 360, traffic: 820 },
  { name: "09", user: 300, traffic: 710 },
  { name: "10", user: 420, traffic: 940 },
  { name: "11", user: 480, traffic: 1100 },
  { name: "12", user: 510, traffic: 1180 },
  { name: "13", user: 390, traffic: 860 },
  { name: "14", user: 340, traffic: 790 },
  { name: "15", user: 460, traffic: 1010 },
  { name: "16", user: 530, traffic: 1220 },
  { name: "17", user: 400, traffic: 900 },
  { name: "18", user: 370, traffic: 830 },
  { name: "19", user: 440, traffic: 970 },
  { name: "20", user: 490, traffic: 1120 },
  { name: "21", user: 520, traffic: 1200 },
  { name: "22", user: 350, traffic: 800 },
  { name: "23", user: 310, traffic: 730 },
  { name: "24", user: 430, traffic: 960 },
  { name: "25", user: 470, traffic: 1050 },
  { name: "26", user: 500, traffic: 1140 },
  { name: "27", user: 380, traffic: 850 },
  { name: "28", user: 330, traffic: 760 },
  { name: "29", user: 450, traffic: 990 },
  { name: "30", user: 480, traffic: 1080 },
  { name: "31", user: 510, traffic: 1160 },
];

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

const chartConfig = {
  user: {
    label: "Total User",
    color: "#3b82f6",
  },
  traffic: {
    label: "Total Traffic",
    color: "#10b981",
  },
} satisfies ChartConfig;

type Metric = "user" | "traffic";
type ChartType = "line" | "bar";
type Number = "single" | "both";

function formatNumber(n: number) {
  if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(1)}M`;
  if (n >= 1_000) return `${(n / 1_000).toFixed(1)}K`;
  return n.toString();
}

function calcTrend(data: { user: number; traffic: number }[], key: Metric) {
  if (data.length < 2) return 0;
  const last = data[data.length - 1][key];
  const prev = data[data.length - 2][key];
  return prev === 0 ? 0 : Math.round(((last - prev) / prev) * 100);
}

// ─── Stat Card (skaligus jadi selector metric) ────────────────────────────────

function StatCard({
  label,
  value,
  trend,
  color,
  icon: Icon,
  active,
  onClick,
}: {
  label: string;
  value: number;
  trend: number;
  color: "blue" | "emerald";
  icon: React.ElementType;
  active: boolean;
  onClick: () => void;
}) {
  const isUp = trend >= 0;
  const colorMap = {
    blue: {
      icon: "bg-blue-50 text-blue-600",
      trend: isUp ? "text-emerald-600" : "text-red-500",
      ring: "ring-2 ring-blue-500 bg-blue-50/60",
    },
    emerald: {
      icon: "bg-emerald-50 text-emerald-600",
      trend: isUp ? "text-emerald-600" : "text-red-500",
      ring: "ring-2 ring-emerald-500 bg-emerald-50/60",
    },
  };

  return (
    <button
      type="button"
      onClick={onClick}
      className={`flex items-center gap-3 px-4 py-3 rounded-xl border flex-1 min-w-0
      text-left transition-all duration-150
        ${
          active
            ? `${colorMap[color].ring} border-transparent`
            : "bg-gray-50 border-gray-100 hover:bg-gray-100"
        }`}
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
    </button>
  );
}

function Pill({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`cursor-pointer px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all duration-150
        flex items-center gap-1.5
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
  const [chartType, setChartType] = useState<ChartType>("line");
  const [metric, setMetric] = useState<Metric>("user");
  const [chartNumber, setChartNumber] = useState<Number>("single");

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

  const activeColor = chartConfig[metric].color;

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

            <div className="flex items-center gap-0.5 bg-gray-rounded-xl p-1">
              {[
                { value: "daily", label: "Harian" },
                { value: "monthly", label: "Bulanan" },
                { value: "yearly", label: "Tahunan" },
              ].map((tf) => (
                <Pill
                  key={tf.value}
                  active={timeframe === tf.value}
                  onClick={() => setTimeframe(tf.value)}
                >
                  {tf.label}
                </Pill>
              ))}
            </div>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 mt-4 sm:items-stretch">
          <div className="flex gap-3 flex-1">
            <StatCard
              label="Total User"
              value={totalUser}
              trend={userTrend}
              color="blue"
              icon={Users}
              active={metric === "user"}
              onClick={() => setMetric("user")}
            />
            <StatCard
              label="Total Traffic"
              value={totalTraffic}
              trend={trafficTrend}
              color="emerald"
              icon={Activity}
              active={metric === "traffic"}
              onClick={() => setMetric("traffic")}
            />
          </div>

          <div className="h-10 flex items-center gap-0.5 bg-gray-50 border border-gray-100 rounded-xl p-1 self-start sm:self-center">
            <Pill
              active={chartType === "line"}
              onClick={() => setChartType("line")}
            >
              <ChartLine size={13} />
              Line
            </Pill>
            <Pill
              active={chartType === "bar"}
              onClick={() => setChartType("bar")}
            >
              <ChartBar size={13} />
              Bar
            </Pill>
          </div>
        </div>
      </div>

      <div className="h-[280px] sm:h-[340px] px-2 pb-4 pt-4">
        <ChartContainer config={chartConfig} className="h-full w-full">
          {chartType === "line" ? (
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
              <ChartTooltip
                cursor={{
                  stroke: "#E5E7EB",
                  strokeWidth: 1,
                  strokeDasharray: "4 2",
                }}
                content={<ChartTooltipContent indicator="dot" />}
              />
              <Line
                type="monotone"
                dataKey={metric}
                stroke={activeColor}
                strokeWidth={2.5}
                dot={false}
                activeDot={{ r: 5, strokeWidth: 0, fill: activeColor }}
              />
            </LineChart>
          ) : (
            <BarChart
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
              <ChartTooltip
                cursor={{ fill: "#F9FAFB" }}
                content={<ChartTooltipContent indicator="dot" />}
              />
              <Bar
                dataKey={metric}
                fill={activeColor}
                radius={[4, 4, 0, 0]}
                maxBarSize={36}
              />
            </BarChart>
          )}
        </ChartContainer>
      </div>
    </div>
  );
}
