"use client";

import {
  ChevronDown,
  ChartPie,
  Calendar,
  FileArchive,
  ChartBarStacked,
  User,
  Key,
  Bell,
  Info,
  FileText,
  Settings,
  X,
  CheckCheck,
  LogOut,
} from "lucide-react";
import { useLayout } from "@/app/context/LayoutContext";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { useRef, useState } from "react";
import { User as UserType } from "@/app/types/userType";
import { NavTooltip, ProfileAction, UserAvatar } from "../ui/profile";

const MOCK_USER: UserType | null = {
  id: "1",
  name: "Budi Santoso",
  email: "budi@gmail.com",
  role_id: "1",
  role: {
    id: "1",
    name: "Ketua OSIS",
    guard_name: "admin",
  },
  is_active: true,
  profile_picture: null,
};

const EASE = {
  out: "cubic-bezier(0.25,1,0.5,1)",
  in: "cubic-bezier(0.5,0,0.75,0)",
  spring: "cubic-bezier(0.34,1.56,0.64,1)",
};

const menuItems = [
  {
    title: "Dashboards",
    items: [
      {
        name: "Overview",
        icon: <ChartPie size={18} />,
        href: "/admin",
      },
      {
        name: "Events",
        icon: <Calendar size={18} />,
        href: "/admin/event",
      },
      {
        name: "Documentations",
        icon: <FileArchive size={18} />,
        href: "/admin/documentation",
      },
      {
        name: "Categories",
        icon: <ChartBarStacked size={18} />,
        href: "/admin/categories",
      },
    ],
  },
  {
    title: "Services",
    items: [
      { name: "User", icon: <User size={18} />, href: "/admin/user" },
      {
        name: "Role & Permission",
        icon: <Key size={18} />,
        href: "/admin/permission",
      },
      {
        name: "Notification",
        icon: <Bell size={18} />,
        href: "/admin/notification",
      },
    ],
  },
];

const MOCK_NOTIFS = [
  {
    id: 1,
    type: "info",
    title: "Pengumuman rapat mingguan",
    time: "2m lalu",
    read: false,
  },
  {
    id: 2,
    type: "event",
    title: "Event Hari Kemerdekaan disetujui",
    time: "1j lalu",
    read: false,
  },
  {
    id: 3,
    type: "document",
    title: "Dokumentasi kegiatan diunggah",
    time: "3j lalu",
    read: true,
  },
  {
    id: 4,
    type: "document",
    title: "Dokumentasi kegiatan diunggah",
    time: "3j lalu",
    read: true,
  },
  {
    id: 5,
    type: "event",
    title: "Event bulan depan ditambahkan",
    time: "5j lalu",
    read: true,
  },
];

function getInitials(name: string) {
  return name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
}

function NotifIcon({ type }: { type: string }) {
  const base = "flex items-center justify-center w-8 h-8 rounded-lg shrink-0";
  switch (type) {
    case "info":
      return (
        <span className={`${base} bg-blue-50    text-blue-600`}>
          <Info size={15} />
        </span>
      );
    case "event":
      return (
        <span className={`${base} bg-violet-50  text-violet-600`}>
          <Calendar size={15} />
        </span>
      );
    case "document":
      return (
        <span className={`${base} bg-emerald-50 text-emerald-600`}>
          <FileText size={15} />
        </span>
      );
    default:
      return (
        <span className={`${base} bg-gray-100   text-gray-500`}>
          <Bell size={15} />
        </span>
      );
  }
}

export function SidebarLeft() {
  const { isSidebarLeftOpen } = useLayout();
  const [openMenu, setOpenMenu] = useState<string | null>(null);
  const [profileOpen, setProfileOpen] = useState(false);
  const pathname = usePathname();
  const user = MOCK_USER;

  const profileRef = useRef<HTMLDivElement>(null);

  const isActive = (path: string | undefined) => {
    if (!path) return false;
    if (path === "/admin") return pathname === "/admin";
    return pathname === path || pathname.startsWith(`${path}/`);
  };

  const isParentActive = (item: any) => {
    if (pathname.startsWith(`${item.href}/`)) return false;
    if (item.href) return isActive(item.href);
    if (item.subItems)
      return item.subItems.some((sub: any) => isActive(sub.href));
    return false;
  };

  const initials = user ? getInitials(user.name) : "";

  return (
    <aside
      className={`
        fixed z-40 top-0 left-0 h-full bg-white border-r border-gray-100
        flex flex-col transition-all duration-300 ease-in-out
        lg:translate-x-0
      ${
        isSidebarLeftOpen
          ? "w-64 translate-x-0 p-0"
          : "-translate-x-full lg:w-[72px]"
      }`}
    >
      <div
        className={`h-20 flex items-center gap-2 ${isSidebarLeftOpen ? "px-6" : "px-5"} border-b border-gray-200`}
      >
        <img
          src="/images/logo.svg"
          alt="Logo"
          className={`rounded-full object-cover transition-all duration-300 ${isSidebarLeftOpen ? "w-10 h-10" : "w-8 h-8"}`}
        />
        <h3
          className={`font-outfit text-xl font-bold text-gradient transition-opacity duration-300 ${isSidebarLeftOpen ? "opacity-100" : "opacity-0 w-0 hidden"}`}
        >
          OSS67
        </h3>
      </div>

      <div className="mt-4 px-4 overflow-y-auto no-scrollbar overflow-hidden flex-1">
        <div className="flex flex-col gap-6">
          {menuItems.map((section, sectionIndex) => (
            <div key={sectionIndex}>
              {isSidebarLeftOpen && (
                <h3 className="px-3 mb-2 text-xs text-gray-500/50 uppercase font-medium tracking-wider">
                  {section.title}
                </h3>
              )}

              <ul className="flex flex-col gap-2">
                {section.items.map((item, index) => (
                  <li key={index} className="min-w-max text-sm ">
                    {item.subItems ? (
                      <div className="flex flex-col rounded-lg">
                        <button
                          onClick={() =>
                            setOpenMenu(
                              openMenu === item.name ? null : item.name,
                            )
                          }
                          className={`flex items-center justify-between w-full p-3 rounded-lg text-sm font-medium transition-colors cursor-pointer ${
                            isParentActive(item)
                              ? "bg-gray-100 text-blue-dark"
                              : "text-blue-dark/60 "
                          }`}
                        >
                          <div className="flex items-center gap-2">
                            <span className="shrink-0">{item.icon}</span>

                            <span
                              className={`transition-opacity duration-300 whitespace-nowrap ${
                                isSidebarLeftOpen
                                  ? "opacity-100"
                                  : "opacity-0 w-0 overflow-hidden"
                              }`}
                            >
                              {item.name}
                            </span>
                          </div>

                          {isSidebarLeftOpen && (
                            <ChevronDown
                              size={16}
                              className={`transition-transform duration-300 shrink-0 ${
                                openMenu === item.name ? "rotate-180" : ""
                              }`}
                            />
                          )}
                        </button>

                        <div
                          className={`overflow-hidden transition-all duration-300 ease-in-out  ${
                            openMenu === item.name && isSidebarLeftOpen
                              ? "max-h-40 mt-2"
                              : "max-h-0"
                          }`}
                        >
                          <ul className="ml-9 flex flex-col gap-1 border-l-2 border-primary/10 pl-2 ">
                            {item.subItems.map((sub, i) => (
                              <li key={i}>
                                <Link
                                  href={sub.href}
                                  className={`block p-2 rounded-md text-sm transition-colors ${
                                    isActive(sub.href)
                                      ? "text-primary font-semibold"
                                      : "text-blue-dark/60 hover:bg-gray-100 hover:text-blue-dark"
                                  }`}
                                >
                                  {sub.name}
                                </Link>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    ) : (
                      <Link
                        href={item.href || "#"}
                        className={`flex items-center rounded-lg text-sm font-medium transition-all cursor-pointer ${
                          isActive(item.href)
                            ? "bg-gray-100 text-blue-dark"
                            : "text-blue-dark/60 hover:bg-gray-100"
                        }
                           ${isSidebarLeftOpen ? "gap-2 p-3" : "gap-0 p-3"} 
                        `}
                      >
                        <span className="shrink-0">{item.icon}</span>

                        <span
                          className={`transition-opacity duration-300 whitespace-nowrap ${
                            isSidebarLeftOpen
                              ? "opacity-100"
                              : "opacity-0 w-0 overflow-hidden"
                          }`}
                        >
                          {item.name}
                        </span>
                      </Link>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      <div
        ref={profileRef}
        className="shrink-0 px-2 py-3 border-t border-gray-100 relative"
      >
        {user && (
          <>
            {/* Profile popover — transition-all duration-300 (mengikuti pola referensi) */}
            <div
              className={`absolute bottom-full left-2 right-2 mb-2
                bg-white rounded-xl border border-gray-100 shadow-xl shadow-black/8
                overflow-hidden z-50 transition-all duration-300 origin-bottom
                ${
                  profileOpen
                    ? "opacity-100 scale-100 pointer-events-auto"
                    : "opacity-0 scale-95 pointer-events-none"
                }`}
            >
              <div
                className="px-4 py-3.5 bg-gradient-to-br from-blue-50 to-indigo-50
                border-b border-gray-100 flex items-center gap-3"
              >
                <UserAvatar user={user} initials={initials} size="md" />
                <div className="min-w-0">
                  <p className="text-sm font-semibold text-gray-900 truncate">
                    {user.name}
                  </p>
                  <p className="text-xs text-gray-500">{user.role?.name}</p>
                </div>
              </div>
              <div className="py-1">
                <ProfileAction
                  href="/admin/profile"
                  icon={<User size={14} />}
                  label="Lihat Profil"
                />
                <ProfileAction
                  href="/admin/settings"
                  icon={<Settings size={14} />}
                  label="Pengaturan Akun"
                />
              </div>
              <div className="border-t border-gray-100 py-1">
                <button
                  onClick={() => {}}
                  className="flex w-full items-center gap-3 px-4 py-2.5 text-sm
                    text-red-500 hover:bg-red-50 transition-colors duration-150"
                >
                  <LogOut size={14} />
                  Keluar
                </button>
              </div>
            </div>

            <NavTooltip label={user.name} show={!isSidebarLeftOpen}>
              <button
                onClick={() => setProfileOpen((v) => !v)}
                className={`w-full flex items-center gap-3 p-3 rounded-xl cursor-pointer
                  text-left transition-colors duration-150 hover:bg-gray-50
                  ${!isSidebarLeftOpen ? "justify-center" : ""}`}
              >
                <UserAvatar user={user} initials={initials} size="sm" />
                <div
                  className={`min-w-0 flex-1 transition-opacity duration-300
                  ${isSidebarLeftOpen ? "opacity-100" : "opacity-0 w-0 overflow-hidden"}`}
                >
                  <p className="text-sm font-semibold text-gray-900 truncate leading-tight">
                    {user.name}
                  </p>
                  <p className="text-xs text-gray-400 mt-0.5">
                    {user.role?.name}
                  </p>
                </div>
                {isSidebarLeftOpen && (
                  <ChevronDown
                    size={14}
                    className={`shrink-0 text-gray-400 transition-transform duration-300
                      ${profileOpen ? "rotate-180" : ""}`}
                  />
                )}
              </button>
            </NavTooltip>
          </>
        )}
      </div>
    </aside>
  );
}

export function SidebarRight() {
  const { isSidebarRightOpen, setIsSidebarRightOpen } = useLayout() as any;
  const [notifs, setNotifs] = useState(MOCK_NOTIFS);
  const [removing, setRemoving] = useState<Set<number>>(new Set());

  const unreadCount = notifs.filter((n) => !n.read).length;

  const markAllRead = () =>
    setNotifs((prev) => prev.map((n) => ({ ...n, read: true })));

  const markRead = (id: number) => {
    setNotifs((prev) =>
      prev.map((n) => (n.id === id ? { ...n, read: true } : n)),
    );
  };

  return (
    <>
      {/* ── Overlay ─────────────────────────────────────────────────────── */}
      <div
        onClick={() => setIsSidebarRightOpen?.(false)}
        className="fixed inset-0 z-30 lg:hidden"
        style={{
          backgroundColor: isSidebarRightOpen
            ? "rgba(0,0,0,0.28)"
            : "rgba(0,0,0,0)",
          backdropFilter: isSidebarRightOpen ? "blur(2px)" : "blur(0px)",
          pointerEvents: isSidebarRightOpen ? "auto" : "none",
          transition: `background-color 300ms ${EASE.out}, backdrop-filter 300ms ${EASE.out}`,
        }}
      />

      {/* ── Panel ───────────────────────────────────────────────────────── */}
      <aside
        className="fixed z-40 top-0 right-0 h-full w-80 bg-white
          border-l border-gray-100 flex flex-col"
        style={{
          // Slide from right with spring deceleration
          transform: isSidebarRightOpen ? "translateX(0)" : "translateX(100%)",
          boxShadow: isSidebarRightOpen
            ? "-8px 0 40px rgba(0,0,0,0.08)"
            : "none",
          transition: `transform 350ms ${isSidebarRightOpen ? EASE.out : EASE.in},
                       box-shadow 350ms ${EASE.out}`,
        }}
      >
        {/* ── Notification section ──────────────────────────────────────── */}
        <div className="flex flex-col flex-1 min-h-0">
          {/* Header */}
          <div
            className="h-16 flex items-center justify-between px-5
            border-b border-gray-100 shrink-0"
          >
            <div className="flex items-center gap-2.5">
              <Bell size={16} className="text-gray-700" />
              <h2 className="text-sm font-semibold text-gray-900">
                Notifikasi
              </h2>
              {/* Badge bounces in when count changes */}
              {unreadCount > 0 && (
                <span
                  className="inline-flex items-center justify-center min-w-[18px] h-[18px]
                    px-1 rounded-full bg-blue-600 text-[10px] font-bold text-white"
                  style={{
                    animation:
                      "badgePop 0.3s cubic-bezier(0.34,1.56,0.64,1) both",
                  }}
                >
                  {unreadCount}
                </span>
              )}
            </div>
            <div className="flex items-center gap-1">
              {unreadCount > 0 && (
                <button
                  onClick={markAllRead}
                  className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg
                    text-xs text-gray-500 hover:text-gray-700 hover:bg-blue-50
                    transition-all duration-150"
                >
                  <CheckCheck size={13} />
                  <span>Semua</span>
                </button>
              )}
              <button
                onClick={() => setIsSidebarRightOpen?.(false)}
                className="w-8 h-8 rounded-lg flex items-center justify-center
                  text-gray-400 hover:text-gray-700 hover:bg-gray-100
                  transition-all duration-150"
              >
                <X size={16} />
              </button>
            </div>
          </div>

          {/* Notif list */}
          <div
            className="flex-1 overflow-y-auto py-2 px-2
            [scrollbar-width:none] [&::-webkit-scrollbar]:hidden min-h-0"
          >
            {notifs.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-full text-center px-6 py-10">
                <div className="w-12 h-12 rounded-2xl bg-gray-100 flex items-center justify-center mb-3">
                  <Bell size={20} className="text-gray-400" />
                </div>
                <p className="text-sm font-medium text-gray-900 mb-1">
                  Tidak ada notifikasi
                </p>
                <p className="text-xs text-gray-400">
                  Kamu sudah membaca semua notifikasi.
                </p>
              </div>
            ) : (
              <ul className="space-y-0.5">
                {notifs.map((notif, idx) => (
                  <li
                    key={notif.id}
                    style={{
                      // Items stagger in when sidebar opens
                      animation: isSidebarRightOpen
                        ? `slideInRight 280ms ${EASE.out} ${idx * 45 + 80}ms both`
                        : "none",
                    }}
                  >
                    <button
                      onClick={() => markRead(notif.id)}
                      className={`w-full flex items-start gap-3 px-3 py-3.5 rounded-xl
                        text-left
                        ${notif.read ? "hover:bg-gray-50" : "bg-blue-50/50 hover:bg-blue-50"}`}
                      style={{
                        transition: `background-color 200ms ${EASE.out}`,
                      }}
                    >
                      <NotifIcon type={notif.type} />
                      <div className="flex-1 min-w-0">
                        <p
                          className={`text-xs leading-snug truncate
                          ${notif.read ? "text-gray-600 font-normal" : "text-gray-900 font-medium"}`}
                          style={{
                            transition: `color 250ms, font-weight 250ms`,
                          }}
                        >
                          {notif.title}
                        </p>
                        <p className="text-[11px] text-gray-400 mt-1">
                          {notif.time}
                        </p>
                      </div>
                      {/* Unread dot fades out when read */}
                      <span
                        className="mt-1.5 w-2 h-2 rounded-full bg-blue-500 shrink-0"
                        style={{
                          opacity: notif.read ? 0 : 1,
                          transform: notif.read ? "scale(0)" : "scale(1)",
                          transition: `opacity 300ms ${EASE.out}, transform 300ms ${EASE.spring}`,
                        }}
                      />
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>

        {/* ── Activities section ────────────────────────────────────────── */}
        <div
          className="flex flex-col border-t border-gray-100"
          style={{ maxHeight: "45%" }}
        >
          <div
            className="flex items-center justify-between px-5 py-3.5 shrink-0
            border-b border-gray-100"
          >
            <div className="flex items-center gap-2.5">
              <Settings size={16} className="text-gray-700" />
              <h2 className="text-sm font-semibold text-gray-900">
                Activities
              </h2>
            </div>
          </div>

          <div
            className="overflow-y-auto py-2 px-2
            [scrollbar-width:none] [&::-webkit-scrollbar]:hidden flex-1 min-h-0"
          >
            <ul className="space-y-0.5">
              {notifs.map((notif, idx) => (
                <li
                  key={notif.id}
                  style={{
                    animation: isSidebarRightOpen
                      ? `slideInRight 280ms ${EASE.out} ${idx * 40 + 200}ms both`
                      : "none",
                  }}
                >
                  <div
                    className="flex items-start gap-3 px-3 py-3 rounded-xl
                    hover:bg-gray-50 transition-colors duration-150"
                  >
                    <NotifIcon type={notif.type} />
                    <div className="flex-1 min-w-0">
                      <p className="text-xs leading-snug text-gray-700 truncate">
                        {notif.title}
                      </p>
                      <p className="text-[11px] text-gray-400 mt-1">
                        {notif.time}
                      </p>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* ── Footer ───────────────────────────────────────────────────── */}
        <div className="shrink-0 px-4 py-3 border-t border-gray-100">
          <Link
            href="/admin/notification"
            className="block w-full text-center text-xs font-medium
              text-blue-600 hover:text-blue-700 py-2 rounded-lg hover:bg-blue-50
              transition-all duration-150"
          >
            Lihat semua notifikasi
          </Link>
        </div>
      </aside>
    </>
  );
}
