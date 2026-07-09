"use client";

import { useState } from "react";
import { ChevronLeft, ChevronRight, MapPin } from "lucide-react";
import type { EventStatus } from "@/app/types/eventType";

interface CalendarEvent {
  id: number;
  name: string;
  date: Date;
  status: EventStatus;
  category: string;
  location: string;
}

const events: CalendarEvent[] = [
  {
    id: 1,
    name: "PHBN 2025",
    date: new Date(2025, 0, 29),
    status: "completed",
    category: "Olahraga",
    location: "Gor, Lt. 4",
  },
  {
    id: 2,
    name: "PONKA 2025",
    date: new Date(2025, 1, 11),
    status: "ongoing",
    category: "Keagamaan",
    location: "Kapel, Lt. 2",
  },
  {
    id: 3,
    name: "MPLS 2025",
    date: new Date(2025, 1, 27),
    status: "upcoming",
    category: "Sosial",
    location: "Graha, Lt. 4",
  },
];

const monthNamesFull = [
  "Januari",
  "Februari",
  "Maret",
  "April",
  "Mei",
  "Juni",
  "Juli",
  "Agustus",
  "September",
  "Oktober",
  "November",
  "Desember",
];

const monthNamesShort = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "Mei",
  "Jun",
  "Jul",
  "Agu",
  "Sep",
  "Okt",
  "Nov",
  "Des",
];

const statusConfig: Record<
  EventStatus,
  { badge: string; dot: string; card: string; label: string }
> = {
  completed: {
    badge: "bg-emerald-50 text-emerald-700",
    dot: "bg-emerald-500",
    card: "bg-emerald-500",
    label: "Selesai",
  },
  ongoing: {
    badge: "bg-yellow-50 text-yellow-700",
    dot: "bg-yellow-400",
    card: "bg-yellow-400",
    label: "Berlangsung",
  },
  upcoming: {
    badge: "bg-blue-50 text-[#1e3a8a]",
    dot: "bg-[#1e3a8a]",
    card: "bg-[#1e3a8a]",
    label: "Akan Datang",
  },
};

export default function CalendarPage() {
  const [currentDate, setCurrentDate] = useState(new Date(2025, 1, 1));
  const today = new Date();

  const currentYear = currentDate.getFullYear();
  const currentMonth = currentDate.getMonth();

  const prevMonth = () =>
    setCurrentDate(new Date(currentYear, currentMonth - 1, 1));
  const nextMonth = () =>
    setCurrentDate(new Date(currentYear, currentMonth + 1, 1));

  const getFirstDayOfMonth = (year: number, month: number) => {
    const day = new Date(year, month, 1).getDay();
    return day === 0 ? 6 : day - 1;
  };

  const buildCalendarDays = (year: number, month: number) => {
    const firstDayIndex = getFirstDayOfMonth(year, month);
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const daysInPrevMonth = new Date(year, month, 0).getDate();

    const days = [];

    for (let i = 0; i < firstDayIndex; i++) {
      days.push({
        date: new Date(
          year,
          month - 1,
          daysInPrevMonth - firstDayIndex + 1 + i,
        ),
        isCurrentMonth: false,
      });
    }

    for (let i = 1; i <= daysInMonth; i++) {
      days.push({ date: new Date(year, month, i), isCurrentMonth: true });
    }

    const totalSlots = days.length <= 35 ? 35 : 42;
    const remainingSlots = totalSlots - days.length;

    for (let i = 1; i <= remainingSlots; i++) {
      days.push({
        date: new Date(year, month + 1, i),
        isCurrentMonth: false,
      });
    }

    return days;
  };

  const isSameDay = (a: Date, b: Date) =>
    a.getFullYear() === b.getFullYear() &&
    a.getMonth() === b.getMonth() &&
    a.getDate() === b.getDate();

  const getEventForDate = (date: Date) =>
    events.find((e) => isSameDay(e.date, date)) || null;

  const calendarDays = buildCalendarDays(currentYear, currentMonth);

  return (
    <div className="w-full font-sans dark:bg-black">
      <div className="max-w-6xl mx-auto px-5 sm:px-8 md:px-12 py-12 pt-4">
        <div className="mb-8 sm:mb-10">
          <span className="inline-block text-xs font-semibold tracking-widest uppercase text-primary-blue mb-2">
            Calendar Kegiatan
          </span>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold leading-tight text-foreground">
            Atur Jadwalmu, jangan <br className="hidden sm:block" />
            sampai tertinggal
          </h1>
          <p className="text-sm sm:text-base text-muted-foreground mt-2 leading-relaxed max-w-lg">
            Jadwal untuk melihat kegiatan yang akan datang, sedang berlangsung
            dan yang sudah selesai.
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-6 lg:gap-8">
          <div className="flex-1 min-w-0 bg-white rounded-2xl sm:rounded-3xl border border-gray-100 p-4 sm:p-6">
            <div className="flex items-center justify-between gap-3 mb-4 sm:mb-5">
              <div className="text-sm sm:text-base font-bold text-gray-900">
                {monthNamesFull[currentMonth]}{" "}
                <span className="font-medium text-gray-400">{currentYear}</span>
              </div>
              <div className="flex items-center gap-1">
                <button
                  onClick={prevMonth}
                  className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-gray-100 text-gray-500 hover:text-gray-900 transition-colors"
                  aria-label="Bulan sebelumnya"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <button
                  onClick={nextMonth}
                  className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-gray-100 text-gray-500 hover:text-gray-900 transition-colors"
                  aria-label="Bulan berikutnya"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>

            <div className="rounded-xl sm:rounded-2xl overflow-hidden border border-gray-100">
              <div className="grid grid-cols-7 bg-gray-50 border-b border-gray-100">
                {["SEN", "SEL", "RAB", "KAM", "JUM", "SAB", "MIN"].map(
                  (day) => (
                    <div
                      key={day}
                      className="text-[10px] sm:text-xs text-gray-400 text-center font-semibold py-2 sm:py-2.5 tracking-wide"
                    >
                      {day}
                    </div>
                  ),
                )}
              </div>

              <div className="grid grid-cols-7">
                {calendarDays.map((dayObj, index) => {
                  const event = getEventForDate(dayObj.date);
                  const isToday = isSameDay(dayObj.date, today);
                  const isLastCol = (index + 1) % 7 === 0;

                  return (
                    <div
                      key={index}
                      className={`min-h-[56px] sm:min-h-[90px] border-b border-gray-100 p-1 sm:p-2.5 relative ${
                        !isLastCol ? "border-r" : ""
                      }`}
                    >
                      <span
                        className={`inline-flex items-center justify-center text-[10px] sm:text-sm h-5 w-5 sm:h-6 sm:w-6 rounded-full ${
                          isToday
                            ? "bg-[#1e3a8a] text-white font-bold"
                            : dayObj.isCurrentMonth
                              ? "text-gray-700"
                              : "text-gray-300"
                        }`}
                      >
                        {dayObj.date.getDate()}
                      </span>
                      {event && (
                        <div className="mt-1">
                          <div
                            className={`rounded-full px-1.5 sm:px-2 py-0.5 text-[7px] sm:text-[10px] font-semibold truncate max-w-full ${
                              statusConfig[event.status].badge
                            }`}
                          >
                            {event.name}
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-x-5 gap-y-2 mt-4 sm:mt-5">
              {(Object.keys(statusConfig) as EventStatus[]).map((key) => (
                <div key={key} className="flex items-center gap-1.5">
                  <div
                    className={`w-2.5 h-2.5 rounded-full ${statusConfig[key].dot}`}
                  />
                  <span className="text-xs text-gray-500 font-medium">
                    {statusConfig[key].label}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="w-full lg:w-[300px] shrink-0">
            <div className="bg-white rounded-2xl sm:rounded-3xl border border-gray-100 p-4 sm:p-5">
              <h3 className="font-bold text-gray-900 mb-4 px-1">
                Event Tahun Ini
              </h3>
              <div className="flex flex-col gap-2.5">
                {events.map((event) => (
                  <div
                    key={event.id}
                    className="flex items-center gap-3 p-3 rounded-xl border border-gray-100 hover:border-gray-200 hover:shadow-sm bg-white transition-all duration-200"
                  >
                    <div
                      className={`w-12 h-12 rounded-xl flex flex-col items-center justify-center shrink-0 ${
                        statusConfig[event.status].card
                      }`}
                    >
                      <span className="text-[9px] text-white/90 font-bold uppercase leading-none mb-0.5">
                        {monthNamesShort[event.date.getMonth()]}
                      </span>
                      <span className="text-lg text-white font-bold leading-none">
                        {event.date.getDate()}
                      </span>
                    </div>

                    <div className="flex flex-col overflow-hidden min-w-0">
                      <span className="text-sm font-semibold text-gray-900 truncate">
                        {event.name}
                      </span>
                      <span className="text-xs text-gray-400 truncate flex items-center gap-1 mt-0.5">
                        {event.category}
                        <span className="h-1 w-1 rounded-full bg-gray-300 shrink-0" />
                        <MapPin className="w-3 h-3 shrink-0" />
                        {event.location}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
