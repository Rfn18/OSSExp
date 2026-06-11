"use client";

import { User } from "@/app/types/userType";
import { Outfit } from "next/font/google";
import Link from "next/link";
import type { ReactNode } from "react";
import { useCallback, useEffect, useRef, useState } from "react";

const outfit = Outfit({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const MOCK_USER: User | null = {
  name: "Budi Santoso",
  email: "budi@gmail.com",
  role: "Ketua OSIS",
  avatar: null,
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
            className={`${outfit.className} ${logoColor} text-xl font-bold tracking-tight transition-colors duration-300`}
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
                    {user.role}
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
                        {user.role}
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
            className={`flex flex-col justify-center items-end w-9 h-9
              rounded-xl gap-[5px] transition-all duration-200 ${iconHover} md:hidden`}
            aria-label="Buka menu navigasi"
          >
            <span
              className={`block w-5 h-[1.5px] ${burgerLine} rounded-full transition-colors`}
            />
            <span
              className={`block w-3.5 h-[1.5px] ${burgerLine} rounded-full transition-colors`}
            />
            <span
              className={`block w-5 h-[1.5px] ${burgerLine} rounded-full transition-colors`}
            />
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
            <span
              className={`${outfit.className} text-lg font-bold
              text-zinc-900 dark:text-white`}
            >
              OSSEXP
            </span>
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

        <div className="px-4 py-5 border-t border-zinc-100 dark:border-zinc-800 shrink-0">
          {!user ? (
            <div className="space-y-2">
              <p
                className="text-[10px] uppercase tracking-widest
                text-zinc-400 dark:text-zinc-500 px-1 mb-3"
              >
                Akun
              </p>
              <Link
                href="/login"
                onClick={() => setDrawerOpen(false)}
                className="block"
              >
                <button
                  className="w-full py-2.5 text-sm font-medium rounded-xl
                  border border-zinc-200 dark:border-zinc-700
                  text-zinc-700 dark:text-zinc-300
                  hover:bg-zinc-50 dark:hover:bg-zinc-800
                  transition-all duration-150"
                >
                  Sign In
                </button>
              </Link>
              <Link
                href="/register"
                onClick={() => setDrawerOpen(false)}
                className="block"
              >
                <button
                  className="w-full py-2.5 text-sm font-medium rounded-xl
                  bg-blue-600 text-white hover:bg-blue-500
                  transition-all duration-150"
                >
                  Sign Up
                </button>
              </Link>
            </div>
          ) : (
            <div className="space-y-1">
              <div
                className="flex items-center gap-3 rounded-xl
                bg-gradient-to-r from-blue-50 to-indigo-50
                dark:from-blue-950/30 dark:to-indigo-950/20
                px-4 py-3 mb-3"
              >
                <UserAvatar user={user} initials={initials} size="md" />
                <div className="min-w-0">
                  <p className="text-sm font-semibold text-zinc-900 dark:text-white truncate">
                    {user.name}
                  </p>
                  <p className="text-xs text-zinc-500 dark:text-zinc-400">
                    {user.role}
                  </p>
                </div>
              </div>
              <DrawerItem
                href="/profile"
                icon={<IcUser />}
                label="Lihat Profil"
                onClick={() => setDrawerOpen(false)}
              />
              <DrawerItem
                href="/settings"
                icon={<IcSettings />}
                label="Pengaturan Akun"
                onClick={() => setDrawerOpen(false)}
              />
              <button
                onClick={() => {}}
                className="flex w-full items-center gap-3 px-4 py-3 rounded-xl
                  text-sm text-red-500
                  hover:bg-red-50 dark:hover:bg-red-500/10
                  transition-all duration-150 mt-1"
              >
                <IcLogout />
                Keluar
              </button>
            </div>
          )}
        </div>
      </aside>
    </>
  );
}

function UserAvatar({
  user,
  initials,
  size = "sm",
}: {
  user: User;
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

function DropdownItem({
  href,
  icon,
  label,
}: {
  href: string;
  icon: ReactNode;
  label: string;
}) {
  return (
    <Link
      href={href}
      className="flex items-center gap-3 px-4 py-2.5 text-sm
        text-zinc-600 dark:text-zinc-300
        hover:bg-zinc-50 dark:hover:bg-zinc-800
        hover:text-zinc-900 dark:hover:text-white
        transition-colors duration-150"
    >
      <span className="text-zinc-400 dark:text-zinc-500">{icon}</span>
      {label}
    </Link>
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

// ─── Icons (inline SVG, no extra dependency) ──────────────────────────────────

function IcUsers({ className = "w-5 h-5" }: { className?: string }) {
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
        d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952
           4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07
           M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766
           l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0
           3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z"
      />
    </svg>
  );
}

function IcCalendar({ className = "w-5 h-5" }: { className?: string }) {
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
        d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5
           A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0
           0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5"
      />
    </svg>
  );
}

function IcGrid({ className = "w-5 h-5" }: { className?: string }) {
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
        d="M3.75 6A2.25 2.25 0 016 3.75h2.25A2.25 2.25 0 0110.5 6v2.25a2.25
           2.25 0 01-2.25 2.25H6a2.25 2.25 0 01-2.25-2.25V6zM3.75 15.75A2.25
           2.25 0 016 13.5h2.25a2.25 2.25 0 012.25 2.25V18a2.25 2.25 0 01-2.25
           2.25H6A2.25 2.25 0 013.75 18v-2.25zM13.5 6a2.25 2.25 0 012.25-2.25H18
           A2.25 2.25 0 0120.25 6v2.25A2.25 2.25 0 0118 10.5h-2.25a2.25 2.25 0
           01-2.25-2.25V6zM13.5 15.75a2.25 2.25 0 012.25-2.25H18a2.25 2.25 0
           012.25 2.25V18A2.25 2.25 0 0118 20.25h-2.25A2.25 2.25 0 0113.5 18v-2.25z"
      />
    </svg>
  );
}

function IcChat({ className = "w-5 h-5" }: { className?: string }) {
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
        d="M7.5 8.25h9m-9 3H12m-9.75 1.51c0 1.6 1.123 2.994 2.707 3.227
           1.129.166 2.27.293 3.423.379.35.026.67.21.865.501L12 21l2.755-4.133
           a1.14 1.14 0 01.865-.501 48.172 48.172 0 003.423-.379c1.584-.233
           2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228
           A48.394 48.394 0 0012 3c-2.392 0-4.744.175-7.043.513C3.373 3.746
           2.25 5.14 2.25 6.741v6.018z"
      />
    </svg>
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

function IcClose({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M6 18L18 6M6 6l12 12"
      />
    </svg>
  );
}

function IcChevron({ className = "w-3 h-3" }: { className?: string }) {
  return (
    <svg
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth={2.5}
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M19.5 8.25l-7.5 7.5-7.5-7.5"
      />
    </svg>
  );
}
