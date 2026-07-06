"use client";

import { User as UserType } from "@/app/types/userType";
import Link from "next/link";
import type { ReactNode } from "react";
import { useCallback, useEffect, useRef, useState } from "react";
import {
  DropdownItem,
  NavTooltip,
  ProfileAction,
  UserAvatar,
} from "../ui/profile";
import { ChevronDown, LogOut, Settings, User } from "lucide-react";
import {
  IcUser,
  IcUsers,
  IcCalendar,
  IcGrid,
  IcChat,
  IcChevron,
  IcSettings,
  IcLogout,
  IcClose,
} from "../ui/icon";

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

const NAV_LINKS = [
  { href: "/OSS67", label: "About OSS67", icon: <IcUsers /> },
  { href: "/event", label: "Events", icon: <IcCalendar /> },
  { href: "/calendar", label: "Calendar", icon: <IcGrid /> },
  { href: "/feedback", label: "Feedback", icon: <IcChat /> },
];

function getInitials(name: string) {
  return name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
}

function sampleBgIsDark(headerEl: HTMLElement | null): boolean {
  if (typeof window === "undefined") return false;

  const cx = window.innerWidth / 2;
  const cy = (headerEl?.offsetHeight ?? 72) / 2;
  const allEls = document.elementsFromPoint(cx, cy) as HTMLElement[];

  const pageEls = allEls.filter(
    (el) => el !== headerEl && !headerEl?.contains(el),
  );

  const parseLum = (cssColor: string): number | null => {
    const m = cssColor.match(
      /rgba?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*([\d.]+))?\)/,
    );
    if (!m) return null;
    if (parseFloat(m[4] ?? "1") < 0.15) return null;
    return (0.299 * +m[1] + 0.587 * +m[2] + 0.114 * +m[3]) / 255;
  };

  for (const el of pageEls) {
    const s = window.getComputedStyle(el);

    if (s.backgroundImage && s.backgroundImage !== "none") return true;

    const lum = parseLum(s.backgroundColor);
    if (lum !== null) return lum < 0.5;
  }

  let node: Element | null = pageEls[pageEls.length - 1] ?? null;
  while (node && node !== document.documentElement) {
    const s = window.getComputedStyle(node as HTMLElement);

    if (s.backgroundImage && s.backgroundImage !== "none") return true;

    const lum = parseLum(s.backgroundColor);
    if (lum !== null) return lum < 0.5;

    node = node.parentElement;
  }

  const htmlS = window.getComputedStyle(document.documentElement);
  if (htmlS.backgroundImage && htmlS.backgroundImage !== "none") return true;
  const rootLum = parseLum(htmlS.backgroundColor);
  if (rootLum !== null) return rootLum < 0.5;
  return false;
}

export default function Headers() {
  const [scrolled, setScrolled] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [isDark, setIsDark] = useState(true);

  const [user] = useState<User | null>(MOCK_USER);

  const headerRef = useRef<HTMLElement>(null);
  const profileRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const detectBg = useCallback(() => {
    setIsDark(sampleBgIsDark(headerRef.current));
  }, []);

  useEffect(() => {
    detectBg();
    window.addEventListener("scroll", detectBg, { passive: true });
    window.addEventListener("resize", detectBg);
    return () => {
      window.removeEventListener("scroll", detectBg);
      window.removeEventListener("resize", detectBg);
    };
  }, [detectBg]);

  useEffect(() => {
    const handle = (e: MouseEvent) => {
      if (
        profileRef.current &&
        !profileRef.current.contains(e.target as Node)
      ) {
        setProfileOpen(false);
      }
    };
    document.addEventListener("mousedown", handle);
    return () => document.removeEventListener("mousedown", handle);
  }, []);

  useEffect(() => {
    document.body.style.overflow = drawerOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [drawerOpen]);

  const headerBg = scrolled
    ? isDark
      ? "bg-white/10 border border-white/10 shadow-lg shadow-black/20 backdrop-blur-lg"
      : "bg-white/80 border border-black/10 shadow-lg shadow-black/10 backdrop-blur-lg"
    : "bg-transparent border border-transparent";

  const logoColor = isDark ? "text-white" : "text-zinc-900";
  const navColor = isDark ? "text-white/65" : "text-zinc-500";
  const navHover = isDark ? "hover:text-white" : "hover:text-zinc-900";
  const lineColor = isDark ? "bg-white" : "bg-zinc-900";
  const burgerLine = isDark ? "bg-white" : "bg-zinc-800";
  const iconHover = isDark ? "hover:bg-white/10" : "hover:bg-black/5";

  const btnOutline = isDark
    ? "border-white/30 text-white hover:bg-white/10"
    : "border-zinc-300 text-zinc-700 hover:bg-zinc-50";

  const initials = user ? getInitials(user.name) : "";

  return (
    <>
      <header
        ref={headerRef}
        className={[
          "sticky top-0 left-0 right-0 mx-auto z-50",
          "flex items-center justify-between",
          "transition-all duration-500 ease-in-out",
          scrolled
            ? "top-4 w-[92%] max-w-6xl rounded-2xl px-5 py-3"
            : "top-0 w-full px-8 py-5",
          headerBg,
        ].join(" ")}
      >
        <Link href="/" className="flex items-center gap-2.5 shrink-0 group">
          <img
            src="/images/logo.svg"
            alt="Logo"
            width="36"
            height="36"
            className="rounded-lg transition-transform duration-300 group-hover:scale-105"
          />
          <span
            className={`font-outfit ${logoColor} text-xl font-bold tracking-tight transition-colors duration-300`}
          >
            OSSEXP
          </span>
        </Link>

        <nav className="hidden md:flex items-center gap-8 text-sm font-medium">
          {NAV_LINKS.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              className={`relative ${navColor} ${navHover} transition-colors duration-200 group`}
            >
              {label}
              <span
                className={`absolute -bottom-0.5 left-0 h-px w-0 group-hover:w-full
                  transition-all duration-300 ${lineColor}`}
              />
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          {!user && (
            <div className="hidden sm:flex items-center gap-2">
              <Link href="/login">
                <button
                  className={`px-4 py-1.5 text-sm font-medium rounded-xl border
                    transition-all duration-200 ${btnOutline}`}
                >
                  Sign In
                </button>
              </Link>
              <Link href="/register">
                <button
                  className="px-4 py-1.5 text-sm font-medium rounded-xl
                    bg-blue-600 text-white hover:bg-blue-500
                    transition-all duration-200"
                >
                  Sign Up
                </button>
              </Link>
            </div>
          )}

          {/* Auth – logged in */}
          {user && (
            <div ref={profileRef} className="relative hidden md:block">
              <button
                onClick={() => setProfileOpen((v) => !v)}
                className={`flex items-center gap-2.5 rounded-full pl-1 pr-3 py-1
                  transition-all duration-200 ${iconHover}`}
              >
                <UserAvatar user={user} initials={initials} size="sm" />
                <div className="text-left hidden lg:block">
                  <p
                    className={`text-xs font-semibold leading-none ${logoColor} transition-colors`}
                  >
                    {user.name}
                  </p>
                  <p
                    className={`text-[10px] mt-0.5 transition-colors
                    ${isDark ? "text-white/50" : "text-zinc-400"}`}
                  >
                    {user.role.name}
                  </p>
                </div>
                <IcChevron
                  className={`w-3 h-3 transition-all duration-200
                    ${isDark ? "text-white/50" : "text-zinc-400"}
                    ${profileOpen ? "rotate-180" : "rotate-0"}`}
                />
              </button>

              {/* Profile dropdown */}
              <div
                className={`absolute right-0 top-full mt-3 w-60 rounded-2xl
                  bg-white dark:bg-zinc-900
                  border border-zinc-100 dark:border-zinc-800
                  shadow-2xl shadow-black/10 overflow-hidden
                  transition-all duration-200 origin-top-right
                  ${
                    profileOpen
                      ? "scale-100 opacity-100 pointer-events-auto"
                      : "scale-95 opacity-0 pointer-events-none"
                  }`}
              >
                <div
                  className="px-4 py-4 bg-gradient-to-br from-blue-50 to-indigo-50
                  dark:from-blue-950/40 dark:to-indigo-950/30"
                >
                  <div className="flex items-center gap-3">
                    <UserAvatar user={user} initials={initials} size="md" />
                    <div className="min-w-0">
                      <p className="text-sm font-semibold text-zinc-900 dark:text-white truncate">
                        {user.name}
                      </p>
                      <p className="text-xs text-zinc-500 dark:text-zinc-400">
                        {user.role.name}
                      </p>
                    </div>
                  </div>
                </div>
                <div className="py-1.5">
                  <DropdownItem
                    href="/profile"
                    icon={<IcUser />}
                    label="Lihat Profil"
                  />
                  <DropdownItem
                    href="/settings"
                    icon={<IcSettings />}
                    label="Pengaturan Akun"
                  />
                </div>
                <div className="pb-1.5 pt-0 border-t border-zinc-100 dark:border-zinc-800">
                  <button
                    onClick={() => {}}
                    className="flex w-full items-center gap-3 px-4 py-2.5 text-sm
                      text-red-500 hover:bg-red-50 dark:hover:bg-red-500/10
                      transition-colors duration-150"
                  >
                    <IcLogout />
                    Keluar
                  </button>
                </div>
              </div>
            </div>
          )}

          <button
            onClick={() => setDrawerOpen(true)}
            className={`flex items-center justify-center w-9 h-9 rounded-md transition-all duration-200 ${iconHover} md:hidden`}
            aria-label="Buka menu navigasi"
          >
            <div className="flex flex-col items-end gap-[5px]">
              <span
                className={` block w-5 h-[1.5px] ${burgerLine}  rounded-full transition-colors`}
              />
              <span
                className={`block w-3.5 h-[1.5px] ${burgerLine} rounded-full transition-colors`}
              />
              <span
                className={`block w-5 h-[1.5px] ${burgerLine} rounded-full transition-colors`}
              />
            </div>
          </button>
        </div>
      </header>

      <div
        onClick={() => setDrawerOpen(false)}
        className={`fixed inset-0 z-40 bg-black/50 backdrop-blur-sm
          transition-opacity duration-300
          ${drawerOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}`}
      />

      {/* ──────────────────── SIDE DRAWER ──────────────────── */}
      <aside
        className={`fixed top-0 right-0 z-50 h-full w-80 max-w-[85vw]
          bg-white dark:bg-zinc-950
          flex flex-col
          shadow-2xl shadow-black/30
          transition-transform duration-300 ease-in-out
          ${drawerOpen ? "translate-x-0" : "translate-x-full"}`}
      >
        <div
          className="flex items-center justify-between px-6 py-5
          border-b border-zinc-100 dark:border-zinc-800 shrink-0"
        >
          <Link
            href="/"
            className="flex items-center gap-2.5"
            onClick={() => setDrawerOpen(false)}
          >
            <img src="/images/logo.svg" alt="Logo" width="30" height="30" />
            <span className={`font-outfit text-lg font-bold`}>OSSEXP</span>
          </Link>
          <button
            onClick={() => setDrawerOpen(false)}
            className="w-8 h-8 rounded-lg flex items-center justify-center
              text-zinc-400 hover:text-zinc-700 dark:hover:text-zinc-200
              hover:bg-zinc-100 dark:hover:bg-zinc-800
              transition-all duration-150"
            aria-label="Tutup menu"
          >
            <IcClose />
          </button>
        </div>

        {/* Nav links */}
        <nav className="flex-1 px-3 py-5 space-y-0.5 overflow-y-auto">
          <p
            className="text-[10px] uppercase tracking-widest
            text-zinc-400 dark:text-zinc-500 px-4 mb-3"
          >
            Navigasi
          </p>
          {NAV_LINKS.map(({ href, label, icon }) => (
            <Link
              key={href}
              href={href}
              onClick={() => setDrawerOpen(false)}
              className="flex items-center gap-4 px-4 py-3 rounded-xl
                text-zinc-600 dark:text-zinc-400
                hover:bg-zinc-100 dark:hover:bg-zinc-800/70
                hover:text-zinc-900 dark:hover:text-white
                transition-all duration-150 group"
            >
              <span
                className="text-zinc-400 dark:text-zinc-500
                group-hover:text-blue-500 transition-colors duration-150"
              >
                {icon}
              </span>
              <span className="text-sm font-medium">{label}</span>
            </Link>
          ))}
        </nav>

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
                    <p className="text-xs text-gray-500">{user.role.name}</p>
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

              <NavTooltip label={user.name} show={true}>
                <button
                  onClick={() => setProfileOpen((v) => !v)}
                  className={`w-full flex items-center gap-3 p-3 rounded-xl cursor-pointer
                  text-left transition-colors duration-150 hover:bg-gray-50
                  `}
                >
                  <UserAvatar user={user} initials={initials} size="sm" />
                  <div
                    className={`min-w-0 flex-1 transition-opacity duration-300opacity-100" : "opacity-0 w-0 overflow-hidden"}`}
                  >
                    <p className="text-sm font-semibold text-gray-900 truncate leading-tight">
                      {user.name}
                    </p>
                    <p className="text-xs text-gray-400 mt-0.5">
                      {user.role.name}
                    </p>
                  </div>

                  <ChevronDown
                    size={14}
                    className={`shrink-0 text-gray-400 transition-transform duration-300
                      ${profileOpen ? "rotate-180" : ""}`}
                  />
                </button>
              </NavTooltip>
            </>
          )}
        </div>
      </aside>
    </>
  );
}
