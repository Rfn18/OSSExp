"use client";

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
import DataTable, { DataTableColumn } from "@/components/admin/table/dataTable";
import {
  StatusBadge,
  ActionButton,
} from "@/components/admin/table/tableParts";

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

export default function LatestEventsTable() {
  const columns: DataTableColumn<Event>[] = [
    {
      key: "title",
      header: "Event",
      render: (e) => (
        <span className="font-medium text-gray-900 text-sm">{e.title}</span>
      ),
    },
    {
      key: "location",
      header: "Location",
      render: (e) => (
        <span className="text-gray-500 text-sm">{e.location}</span>
      ),
    },
    {
      key: "date",
      header: "Date",
      render: (e) =>
        e.startDate === e.endDate ? (
          <span className="text-gray-700 text-sm">{e.startDate}</span>
        ) : (
          <span className="text-gray-700 text-sm">
            {e.startDate}
            <span className="mx-1.5 text-gray-300">→</span>
            {e.endDate}
          </span>
        ),
    },
    {
      key: "time",
      header: "Time",
      render: (e) => (
        <span className="text-gray-700 text-sm tabular-nums">
          {e.startTime}
          <span className="mx-1 text-gray-300">–</span>
          {e.endTime}
        </span>
      ),
    },
    {
      key: "status",
      header: "Status",
      render: (e) => {
        const cfg = STATUS_CONFIG[e.status];
        return (
          <StatusBadge
            label={cfg.label}
            dotColor={cfg.dot}
            badgeColor={cfg.badge}
          />
        );
      },
    },
    {
      key: "uploader",
      header: "Uploader",
      render: (e) => (
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded-full bg-gray-200 flex items-center justify-center shrink-0">
            <User size={11} className="text-gray-500" />
          </div>
          <span className="text-gray-600 text-sm">{e.uploader}</span>
        </div>
      ),
    },
    {
      key: "action",
      header: "Action",
      align: "center",
      render: () => (
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
      ),
    },
  ];

  const renderMobileCard = (event: Event) => (
    <>
      <div className="flex items-start justify-between gap-3 mb-2.5">
        <p className="font-semibold text-gray-900 text-sm leading-snug truncate min-w-0">
          {event.title}
        </p>
        <StatusBadge
          label={STATUS_CONFIG[event.status].label}
          dotColor={STATUS_CONFIG[event.status].dot}
          badgeColor={STATUS_CONFIG[event.status].badge}
        />
      </div>
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
    </>
  );

  return (
    <DataTable<Event>
      title="Latest Events"
      subtitle={`${events.length} events · recently added or upcoming`}
      headerAction={
        <button className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-blue-600 text-white text-sm font-medium hover:bg-blue-500 transition-colors duration-150">
          View All <ArrowRight size={14} />
        </button>
      }
      columns={columns}
      data={events}
      rowKey={(e) => e.id}
      renderMobileCard={renderMobileCard}
      emptyTitle="Belum ada event"
      emptyDescription="Event yang ditambahkan akan muncul di sini."
    >
      <div className="flex items-center justify-between">
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
                className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-medium ${cfg.badge}`}
              >
                <span className={`w-1 h-1 rounded-full ${cfg.dot}`} /> {count}{" "}
                {s}
              </span> 
            );
          })}
        </div>
      </div>
    </DataTable>
  );
}
