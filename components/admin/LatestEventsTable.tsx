"use client";

import { useState } from "react";
import {
  Edit,
  Eye,
  Trash2,
  CalendarDays,
  MapPin,
  Clock,
  User,
  ArrowRight,
} from "lucide-react";

// ─── Types ────────────────────────────────────────────────────────────────────

type Status = "Upcoming" | "Ongoing" | "Completed";

interface Event {
  id: number;
  title: string;
  location: string;
  startTime: string;
  endTime: string;
  startDate: string;
  endDate: string;
  status: Status;
  uploader: string;
}

// ─── Data ─────────────────────────────────────────────────────────────────────

const events: Event[] = [
  {
    id: 1,
    title: "Tech Conference 2026",
    location: "Jakarta, Convention Center",
    startTime: "09:00",
    endTime: "17:00",
    startDate: "10 Oct 2026",
    endDate: "12 Oct 2026",
    status: "Upcoming",
    uploader: "Admin John",
  },
  {
    id: 2,
    title: "Web3 Developer Meetup",
    location: "Bali, Co-working Space",
    startTime: "13:00",
    endTime: "15:00",
    startDate: "15 Oct 2026",
    endDate: "15 Oct 2026",
    status: "Ongoing",
    uploader: "Jane Doe",
  },
  {
    id: 3,
    title: "AI Workshop",
    location: "Online (Zoom)",
    startTime: "19:00",
    endTime: "21:00",
    startDate: "20 Oct 2026",
    endDate: "20 Oct 2026",
    status: "Completed",
    uploader: "Admin John",
  },
  {
    id: 4,
    title: "Design System Masterclass",
    location: "Bandung, Creative Hub",
    startTime: "10:00",
    endTime: "14:00",
    startDate: "01 Nov 2026",
    endDate: "02 Nov 2026",
    status: "Upcoming",
    uploader: "Sarah Lee",
  },
];

// ─── Status config ─────────────────────────────────────────────────────────────

const STATUS_CONFIG: Record<
  Status,
  { dot: string; badge: string; label: string }
> = {
  Upcoming: {
    dot: "bg-blue-500",
    badge: "bg-blue-50 text-blue-700 ring-1 ring-blue-200/60",
    label: "Upcoming",
  },
  Ongoing: {
    dot: "bg-amber-500",
    badge: "bg-amber-50 text-amber-700 ring-1 ring-amber-200/60",
    label: "Ongoing",
  },
  Completed: {
    dot: "bg-emerald-500",
    badge: "bg-emerald-50 text-emerald-700 ring-1 ring-emerald-200/60",
    label: "Completed",
  },
};

// ─── Sub-components ────────────────────────────────────────────────────────────

function StatusBadge({ status }: { status: Status }) {
  const cfg = STATUS_CONFIG[status];
  return (
    <span
      className={`inline-flex items-center gap-1.5 px-2.5 py-1
      rounded-full text-xs font-medium whitespace-nowrap ${cfg.badge}`}
    >
      <span className={`w-1.5 h-1.5 rounded-full ${cfg.dot}`} />
      {cfg.label}
    </span>
  );
}

function ActionButton({
  onClick,
  title,
  color,
  children,
}: {
  onClick?: () => void;
  title: string;
  color: "blue" | "amber" | "red";
  children: React.ReactNode;
}) {
  const colorMap = {
    blue: "text-blue-600  hover:bg-blue-50  hover:text-blue-700",
    amber: "text-amber-600 hover:bg-amber-50 hover:text-amber-700",
    red: "text-red-500   hover:bg-red-50   hover:text-red-600",
  };
  return (
    <button
      onClick={onClick}
      title={title}
      className={`w-8 h-8 rounded-lg flex items-center justify-center
        transition-all duration-150 ${colorMap[color]}`}
    >
      {children}
    </button>
  );
}

// ─── Main Component ────────────────────────────────────────────────────────────

export default function LatestEventsTable() {
  const [hovered, setHovered] = useState<number | null>(null);

  return (
    <div
      className=" bg-white rounded-2xl border border-gray-100 shadow-sm
      overflow-hidden mt-6"
    >
      <div
        className=" flex flex-col sm:flex-row sm:items-center justify-between
        gap-3 px-5 sm:px-6 py-5 border-b border-gray-100"
      >
        <div>
          <h2 className="text-base font-semibold text-gray-900">
            Latest Events
          </h2>
          <p className="text-xs text-gray-400 mt-0.5">
            {events.length} events · recently added or upcoming
          </p>
        </div>
        <button
          className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl
          bg-blue-600 text-white text-sm font-medium
          hover:bg-blue-500 transition-colors duration-150 self-start sm:self-auto"
        >
          View All
          <ArrowRight size={14} />
        </button>
      </div>

      <div className="hidden md:block overflow-x-auto">
        <table className="w-full text-sm border-collapse">
          <thead>
            <tr className="border-b border-gray-100">
              <th
                className="px-5 py-3 text-left text-[11px] font-semibold
                uppercase tracking-wider text-gray-400 whitespace-nowrap"
              >
                Event
              </th>
              <th
                className="px-4 py-3 text-left text-[11px] font-semibold
                uppercase tracking-wider text-gray-400 whitespace-nowrap"
              >
                Location
              </th>
              <th
                className="px-4 py-3 text-left text-[11px] font-semibold
                uppercase tracking-wider text-gray-400 whitespace-nowrap"
              >
                Date
              </th>
              <th
                className="px-4 py-3 text-left text-[11px] font-semibold
                uppercase tracking-wider text-gray-400 whitespace-nowrap"
              >
                Time
              </th>
              <th
                className="px-4 py-3 text-left text-[11px] font-semibold
                uppercase tracking-wider text-gray-400 whitespace-nowrap"
              >
                Status
              </th>
              <th
                className="px-4 py-3 text-left text-[11px] font-semibold
                uppercase tracking-wider text-gray-400 whitespace-nowrap"
              >
                Uploader
              </th>
              <th
                className="px-4 py-3 text-center text-[11px] font-semibold
                uppercase tracking-wider text-gray-400 whitespace-nowrap"
              >
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {events.length === 0 ? (
              <tr>
                <td colSpan={7} className="px-5 py-16 text-center">
                  <EmptyState />
                </td>
              </tr>
            ) : (
              events.map((event) => (
                <tr
                  key={event.id}
                  onMouseEnter={() => setHovered(event.id)}
                  onMouseLeave={() => setHovered(null)}
                  className={`border-b border-gray-50 transition-colors duration-100
                    ${hovered === event.id ? "bg-gray-50/70" : "bg-white"}`}
                >
                  {/* Title */}
                  <td className="px-5 py-4 whitespace-nowrap">
                    <span className="font-medium text-gray-900 text-sm">
                      {event.title}
                    </span>
                  </td>

                  <td className="px-4 py-4 whitespace-nowrap">
                    <span className="text-gray-500 text-sm">
                      {event.location}
                    </span>
                  </td>

                  <td className="px-4 py-4 whitespace-nowrap">
                    {event.startDate === event.endDate ? (
                      <span className="text-gray-700 text-sm">
                        {event.startDate}
                      </span>
                    ) : (
                      <span className="text-gray-700 text-sm">
                        {event.startDate}
                        <span className="mx-1.5 text-gray-300">→</span>
                        {event.endDate}
                      </span>
                    )}
                  </td>

                  {/* Time — merged */}
                  <td className="px-4 py-4 whitespace-nowrap">
                    <span className="text-gray-700 text-sm tabular-nums">
                      {event.startTime}
                      <span className="mx-1 text-gray-300">–</span>
                      {event.endTime}
                    </span>
                  </td>

                  {/* Status */}
                  <td className="px-4 py-4 whitespace-nowrap">
                    <StatusBadge status={event.status as Status} />
                  </td>

                  {/* Uploader */}
                  <td className="px-4 py-4 whitespace-nowrap">
                    <div className="flex items-center gap-2">
                      <div
                        className="w-6 h-6 rounded-full bg-gray-200
                        flex items-center justify-center shrink-0"
                      >
                        <User size={11} className="text-gray-500" />
                      </div>
                      <span className="text-gray-600 text-sm">
                        {event.uploader}
                      </span>
                    </div>
                  </td>

                  {/* Actions */}
                  <td className="px-4 py-4 whitespace-nowrap">
                    <div className="flex items-center justify-center gap-1">
                      <ActionButton title="Detail" color="blue">
                        <Eye size={15} />
                      </ActionButton>
                      <ActionButton title="Edit" color="amber">
                        <Edit size={15} />
                      </ActionButton>
                      <ActionButton title="Hapus" color="red">
                        <Trash2 size={15} />
                      </ActionButton>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* ── Mobile Card List ────────────────────────────────────────────── */}
      <div className="md:hidden divide-y divide-gray-100">
        {events.length === 0 ? (
          <div className="px-5 py-16 text-center">
            <EmptyState />
          </div>
        ) : (
          events.map((event) => (
            <div
              key={event.id}
              className="px-5 py-4 hover:bg-gray-50/70
              transition-colors duration-100"
            >
              {/* Top row */}
              <div className="flex items-start justify-between gap-3 mb-2.5">
                <div className="min-w-0">
                  <p className="font-semibold text-gray-900 text-sm leading-snug truncate">
                    {event.title}
                  </p>
                </div>
                <StatusBadge status={event.status as Status} />
              </div>

              {/* Meta */}
              <div className="space-y-1.5 mb-3">
                <div className="flex items-center gap-2 text-xs text-gray-500">
                  <MapPin size={12} className="text-gray-400 shrink-0" />
                  <span className="truncate">{event.location}</span>
                </div>
                <div className="flex items-center gap-2 text-xs text-gray-500">
                  <CalendarDays size={12} className="text-gray-400 shrink-0" />
                  <span>
                    {event.startDate === event.endDate
                      ? event.startDate
                      : `${event.startDate} → ${event.endDate}`}
                  </span>
                </div>
                <div className="flex items-center gap-2 text-xs text-gray-500">
                  <Clock size={12} className="text-gray-400 shrink-0" />
                  <span className="tabular-nums">
                    {event.startTime} – {event.endTime}
                  </span>
                </div>
                <div className="flex items-center gap-2 text-xs text-gray-500">
                  <User size={12} className="text-gray-400 shrink-0" />
                  <span>{event.uploader}</span>
                </div>
              </div>

              {/* Actions */}
              <div className="flex items-center gap-1 border-t border-gray-100 pt-3">
                <ActionButton title="Detail" color="blue">
                  <Eye size={14} />
                </ActionButton>
                <ActionButton title="Edit" color="amber">
                  <Edit size={14} />
                </ActionButton>
                <ActionButton title="Hapus" color="red">
                  <Trash2 size={14} />
                </ActionButton>
              </div>
            </div>
          ))
        )}
      </div>

      {/* ── Footer ─────────────────────────────────────────────────────── */}
      {events.length > 0 && (
        <div
          className="px-5 sm:px-6 py-3.5 bg-gray-50/50 border-t border-gray-100
          flex items-center justify-between"
        >
          <p className="text-xs text-gray-400">
            Menampilkan {events.length} dari {events.length} event
          </p>
          <div className="flex items-center gap-1">
            {(["Upcoming", "Ongoing", "Completed"] as Status[]).map((s) => {
              const count = events.filter((e) => e.status === s).length;
              const cfg = STATUS_CONFIG[s];
              return (
                <span
                  key={s}
                  className={`inline-flex items-center gap-1 px-2 py-0.5
                    rounded-full text-[10px] font-medium ${cfg.badge}`}
                >
                  <span className={`w-1 h-1 rounded-full ${cfg.dot}`} />
                  {count} {s}
                </span>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}

// ─── Empty state ──────────────────────────────────────────────────────────────

function EmptyState() {
  return (
    <div className="flex flex-col items-center gap-2">
      <div className="w-10 h-10 rounded-xl bg-gray-100 flex items-center justify-center">
        <CalendarDays size={18} className="text-gray-400" />
      </div>
      <p className="text-sm font-medium text-gray-600">Belum ada event</p>
      <p className="text-xs text-gray-400">
        Event yang ditambahkan akan muncul di sini.
      </p>
    </div>
  );
}
