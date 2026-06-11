"use client";

import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";

type EventStatus = "completed" | "ongoing" | "upcoming";

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

export default function CalendarPage() {
  const [currentDate, setCurrentDate] = useState(new Date(2025, 1, 1));

  const currentYear = currentDate.getFullYear();
  const currentMonth = currentDate.getMonth();

  const prevMonth = () => {
    setCurrentDate(new Date(currentYear, currentMonth - 1, 1));
  };

  const nextMonth = () => {
    setCurrentDate(new Date(currentYear, currentMonth + 1, 1));
  };

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
      days.push({
        date: new Date(year, month, i),
        isCurrentMonth: true,
      });
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

  const getEventForDate = (date: Date) => {
    return (
      events.find(
        (e) =>
          e.date.getFullYear() === date.getFullYear() &&
          e.date.getMonth() === date.getMonth() &&
          e.date.getDate() === date.getDate(),
      ) || null
    );
  };

  const calendarDays = buildCalendarDays(currentYear, currentMonth);

  const getBadgeStyle = (status: EventStatus) => {
    switch (status) {
      case "completed":
        return "bg-green-100 text-green-700";
      case "ongoing":
        return "bg-yellow-100 text-yellow-700";
      case "upcoming":
        return "bg-blue-100 text-blue-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  const getCardIconStyle = (status: EventStatus) => {
    switch (status) {
      case "completed":
        return "bg-green-500";
      case "ongoing":
        return "bg-yellow-400";
      case "upcoming":
        return "bg-blue-700";
      default:
        return "bg-gray-500";
    }
  };
  return (
    <div className="w-full min-h-full flex-1 items-center justify-between font-sans dark:bg-black px-20 mt-10">
      <div className="flex flex-col  items-center">
        <p className="text-sm text-primary-blue ">KALENDER</p>
        <h3 className="text-3xl mt-2 font-bold text-center">
          Atur jadwalmu, <br />
          jangan sampai tertinggal
        </h3>
      </div>
      <div className="min-h-screen p-6 md:p-8 flex flex-col md:flex-row gap-6 mt-10">
        <div className="flex-1">
          <div className="flex w-full items-center justify-between mb-4">
            <div className="font-semibold text-gray-800 w-32">
              {monthNamesShort[currentMonth]}, {currentYear}
            </div>
            <div className="flex items-center gap-2">
              <Button variant="ghost" size="sm" onClick={prevMonth}>
                <ChevronLeft className="w-4 h-4" />
              </Button>
              <span className="font-medium text-gray-800 min-w-[140px] text-center">
                {monthNamesFull[currentMonth]} {currentYear}
              </span>
              <Button variant="ghost" size="sm" onClick={nextMonth}>
                <ChevronRight className="w-4 h-4" />
              </Button>
            </div>
          </div>

          <div className="bg-white border border-gray-100 rounded-lg overflow-hidden">
            <div className="grid grid-cols-7 border-b border-gray-100 bg-white">
              {["SEN", "SEL", "RAB", "KAM", "JUM", "SAB", "MIN"].map((day) => (
                <div
                  key={day}
                  className="text-xs text-gray-400 text-center font-medium py-2"
                >
                  {day}
                </div>
              ))}
            </div>

            <div className="grid grid-cols-7">
              {calendarDays.map((dayObj, index) => {
                const event = getEventForDate(dayObj.date);
                return (
                  <div
                    key={index}
                    className="min-h-[80px] border-b border-r border-gray-100 p-2 relative"
                  >
                    <span
                      className={`text-sm block ${
                        dayObj.isCurrentMonth
                          ? "text-gray-700"
                          : "text-gray-300"
                      }`}
                    >
                      {dayObj.date.getDate()}
                    </span>
                    {event && (
                      <div className="mt-1">
                        <div
                          className={`rounded-full px-2 py-0.5 text-[10px] font-medium truncate max-w-full inline-block ${getBadgeStyle(
                            event.status,
                          )}`}
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

          <div className="flex flex-row gap-4 mt-4">
            <div className="flex items-center gap-1.5">
              <div className="w-3 h-3 rounded-full bg-green-500"></div>
              <span className="text-xs text-gray-500">Completed</span>
            </div>
            <div className="flex items-center gap-1.5">
              <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
              <span className="text-xs text-gray-500">Ongoing</span>
            </div>
            <div className="flex items-center gap-1.5">
              <div className="w-3 h-3 rounded-full bg-blue-700"></div>
              <span className="text-xs text-gray-500">Upcoming</span>
            </div>
          </div>
        </div>

        <div className="w-full md:w-[280px] shrink-0">
          <h3 className="font-semibold text-gray-800 mb-4">Event Tahun Ini</h3>
          <div className="flex flex-col">
            {events.map((event) => (
              <div
                key={event.id}
                className="flex items-center gap-3 p-4 rounded-xl border border-gray-100 bg-white mb-3"
              >
                <div
                  className={`w-12 h-12 rounded-xl flex flex-col items-center justify-center shrink-0 ${getCardIconStyle(
                    event.status,
                  )}`}
                >
                  <span className="text-[10px] text-white font-bold uppercase leading-none mb-0.5">
                    {monthNamesShort[event.date.getMonth()]}
                  </span>
                  <span className="text-lg text-white font-bold leading-none">
                    {event.date.getDate()}
                  </span>
                </div>
                
                <div className="flex flex-col overflow-hidden">
                  <span className="text-sm font-semibold text-gray-800 truncate">
                    {event.name}
                  </span>
                  <span className="text-xs text-gray-400 truncate">
                    {event.category} | {event.location}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
