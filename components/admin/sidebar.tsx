"use client";

import {
  Home,
  Users,
  Radio,
  CalendarClock,
  ClockCheck,
  DollarSign,
  ChevronDown,
  Settings,
  ChartPie,
  Calendar,
  FileArchive,
  ChartBarStacked,
  User,
  Key,
  Bell,
} from "lucide-react";
import { Outfit } from "next/font/google";
import { useLayout } from "@/app/context/LayoutContext";
import { usePathname } from "next/navigation";
import Link from "next/link"; // Correct Link import for Next.js
import { ReactNode, useState } from "react";
import { User as userType } from "@/app/types/userType";

const outfit = Outfit({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const MOCK_USER: userType | null = {
  name: "Budi Santoso",
  email: "budi@gmail.com",
  role: "Ketua OSIS",
  avatar: null,
};

export default function Sidebar() {
  const { isSidebarOpen } = useLayout();
  const [openMenu, setOpenMenu] = useState<string | null>(null);
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);
  const pathname = usePathname();
  const user = MOCK_USER;
  const userRole = 2;
  const isActive = (path: string | undefined) => {
    if (!path) return false;
    return pathname === path || pathname.startsWith(`${path}/`);
  };

  const isParentActive = (item: any) => {
    if (item.href) return isActive(item.href);
    if (item.subItems)
      return item.subItems.some((sub: any) => isActive(sub.href));
    return false;
  };

  function getInitials(name: string) {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .slice(0, 2)
      .toUpperCase();
  }

  const initials = user ? getInitials(user.name) : "";

  const menuItems = [
    {
      title: "Dashboards",
      items: [
        {
          name: "Overview",
          icon: <ChartPie size={20} />,
          href: "/admin/dashboard",
        },
        {
          name: "Events",
          icon: <Calendar size={20} />,
          subItems: [
            { name: "Management", href: "/admin/management-event" },
            { name: "Approval", href: "/admin/approval-event" },
          ],
        },
        {
          name: "Documentations",
          icon: <FileArchive size={20} />,
          subItems: [
            { name: "Management", href: "/admin/management-documentation" },
            { name: "Approval", href: "/admin/approval-documentation" },
          ],
        },
        {
          name: "Categories",
          icon: <ChartBarStacked size={20} />,
          href: "/admin/categories",
        },
      ],
    },

    {
      title: "Services",
      items: [
        {
          name: "User",
          icon: <User size={20} />,
          href: "/admin/user",
        },
        {
          name: "Role & Permission",
          icon: <Key size={20} />,
          href: "/admin/role-permission",
        },
        {
          name: "Notification",
          icon: <Bell size={20} />,
          href: "/admin/notification",
        },
      ],
    },
  ];

  return (
    <aside
      className={`
          fixed z-40 top-0 left-0 h-full bg-white border-r border-gray-100  flex flex-col transition-all duration-300 ease-in-out
          ${isSidebarOpen ? "w-64 translate-x-0" : "-translate-x-full"} lg:translate-x-0
          ${isSidebarOpen ? "lg:w-64" : "lg:w-[82px]"}`}
    >
      <div
        className={`h-20 flex items-center gap-2 ${isSidebarOpen ? "px-6" : "px-5"} border-b border-gray-200`}
      >
        <img
          src="/images/logo.svg"
          alt="Logo"
          className={`rounded-full object-cover transition-all duration-300 ${isSidebarOpen ? "w-10 h-10" : "w-8 h-8"}`}
        />
        <h3
          className={`${outfit.className} text-xl font-bold text-gradient transition-opacity duration-300 ${isSidebarOpen ? "opacity-100" : "opacity-0 w-0 hidden"}`}
        >
          OSS67
        </h3>
      </div>

      <div className="mt-4 px-4 overflow-y-auto no-scrollbar overflow-hidden flex-1">
        <div className="flex flex-col gap-6">
          {menuItems.map((section, sectionIndex) => (
            <div key={sectionIndex}>
              {isSidebarOpen && (
                <h3 className="px-3 mb-2 text-sm text-gray-500/50 uppercase font-medium tracking-wider">
                  {section.title}
                </h3>
              )}

              <ul className="flex flex-col gap-2">
                {section.items.map((item, index) => (
                  <li key={index} className="min-w-max text-sm">
                    {item.subItems ? (
                      <div className="flex flex-col">
                        <button
                          onClick={() =>
                            setOpenMenu(
                              openMenu === item.name ? null : item.name,
                            )
                          }
                          className={`flex items-center justify-between w-full p-3 rounded-lg text-sm font-medium transition-colors cursor-pointer ${
                            isParentActive(item)
                              ? "bg-black/5 text-blue-dark"
                              : "text-blue-dark/60 hover:bg-background"
                          }`}
                        >
                          <div className="flex items-center gap-2">
                            <span className="shrink-0">{item.icon}</span>

                            <span
                              className={`transition-opacity duration-300 whitespace-nowrap ${
                                isSidebarOpen
                                  ? "opacity-100"
                                  : "opacity-0 w-0 overflow-hidden"
                              }`}
                            >
                              {item.name}
                            </span>
                          </div>

                          {isSidebarOpen && (
                            <ChevronDown
                              size={16}
                              className={`transition-transform duration-300 shrink-0 ${
                                openMenu === item.name ? "rotate-180" : ""
                              }`}
                            />
                          )}
                        </button>

                        <div
                          className={`overflow-hidden transition-all duration-300 ease-in-out ${
                            openMenu === item.name && isSidebarOpen
                              ? "max-h-40 mt-2"
                              : "max-h-0"
                          }`}
                        >
                          <ul className="ml-9 flex flex-col gap-1 border-l-2 border-primary/10 pl-2">
                            {item.subItems.map((sub, i) => (
                              <li key={i}>
                                <Link
                                  href={sub.href}
                                  className={`block p-2 rounded-md text-sm transition-colors ${
                                    isActive(sub.href)
                                      ? "text-primary font-semibold"
                                      : "text-blue-dark/60 hover:text-blue-dark"
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
                            ? "bg-black/5 text-blue-dark"
                            : "text-blue-dark/60 hover:bg-background"
                        }
                           ${isSidebarOpen ? "gap-2 p-3" : "gap-0 p-3"} 
                        `}
                      >
                        <span className="shrink-0">{item.icon}</span>

                        <span
                          className={`transition-opacity duration-300 whitespace-nowrap ${
                            isSidebarOpen
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

      <div className="p-2 border-t border-border shrink-0">
        {user && (
          <button
            onClick={() => setIsProfileModalOpen(true)}
            className={`w-full cursor-pointer flex items-center gap-3 rounded-xl p-2  transition-all duration-150 text-left ${
              !isSidebarOpen ? "justify-center" : "hover:bg-zinc-100"
            }`}
          >
            <UserAvatar user={user} initials={initials} size="md" />
            <div
              className={`min-w-0 transition-opacity duration-300 ${
                isSidebarOpen ? "opacity-100" : "opacity-0 w-0 overflow-hidden"
              }`}
            >
              <p className="text-sm font-semibold text-zinc-900 truncate">
                {user.name}
              </p>
              <p className="text-xs text-zinc-500">{user.role}</p>
            </div>
          </button>
        )}
      </div>
    </aside>
  );
}

function UserAvatar({
  user,
  initials,
  size = "sm",
}: {
  user: userType;
  initials: string;
  size?: "sm" | "md";
}) {
  const sz = size === "sm" ? "w-8 h-8 text-[11px]" : "w-10 h-10 text-xs";

  if (user.avatar) {
    return (
      <img
        src={user.avatar}
        alt={user.name}
        className={`${sz} rounded-full object-cover ring-2 ring-white/20 shrink-0`}
      />
    );
  }

  return (
    <div
      className={`${sz} rounded-full shrink-0
        bg-gradient-to-br from-blue-500 to-indigo-600
        flex items-center justify-center
        font-bold text-white ring-2 ring-white/20`}
    >
      {initials}
    </div>
  );
}

function DrawerItem({
  href,
  icon,
  label,
  onClick,
}: {
  href: string;
  icon: ReactNode;
  label: string;
  onClick?: () => void;
}) {
  return (
    <Link
      href={href}
      onClick={onClick}
      className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm
        text-zinc-600 dark:text-zinc-400
        hover:bg-zinc-100 dark:hover:bg-zinc-800
        hover:text-zinc-900 dark:hover:text-white
        transition-all duration-150"
    >
      <span className="text-zinc-400 dark:text-zinc-500">{icon}</span>
      {label}
    </Link>
  );
}

function IcUser({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5
           7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z"
      />
    </svg>
  );
}

function IcSettings({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94
           l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.324.196.72.257
           1.075.124l1.217-.456a1.125 1.125 0 011.37.49l1.296 2.247a1.125 1.125 0
           01-.26 1.431l-1.003.827c-.293.24-.438.613-.431.992a6.759 6.759 0
           010 .255c-.007.378.138.75.43.99l1.005.828c.424.35.534.954.26 1.43
           l-1.298 2.247a1.125 1.125 0 01-1.369.491l-1.217-.456c-.355-.133-.75-.072
           -1.076.124a6.57 6.57 0 01-.22.128c-.331.183-.581.495-.644.869l-.213
           1.28c-.09.543-.56.941-1.11.941h-2.594c-.55 0-1.02-.398-1.11-.94l-.213
           -1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 01-.22-.127c-.325-.196
           -.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 01-1.369-.49l-1.297-2.247
           a1.125 1.125 0 01.26-1.431l1.004-.827c.292-.24.437-.613.43-.992a6.932
           6.932 0 010-.255c.007-.378-.138-.75-.43-.99l-1.004-.828a1.125 1.125 0
           01-.26-1.43l1.297-2.247a1.125 1.125 0 011.37-.491l1.216.456c.356.133
           .751.072 1.076-.124.072-.044.146-.087.22-.128.332-.183.582-.495.644
           -.869l.214-1.281z"
      />
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
      />
    </svg>
  );
}

function IcLogout({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5
           A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15M12 9l-3 3m0 0l3
           3m-3-3h12.75"
      />
    </svg>
  );
}
