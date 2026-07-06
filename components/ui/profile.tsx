import { User } from "@/app/types/userType";
import Link from "next/link";
import { ReactNode } from "react";

const EASE = {
  out: "cubic-bezier(0.22, 1, 0.36, 1)",
  spring: "cubic-bezier(0.34, 1.2, 0.64, 1)",
  in: "cubic-bezier(0.55, 0, 1, 0.45)",
} as const;

export function NavTooltip({
  label,
  show,
  children,
}: {
  label: string;
  show: boolean;
  children: ReactNode;
}) {
  if (!show) return <>{children}</>;
  return (
    <div className="relative group/tip">
      {children}
      <div
        className="pointer-events-none absolute left-full top-1/2 ml-3 -translate-y-1/2
          rounded-lg bg-gray-900 px-2.5 py-1.5 z-[70]
          text-xs font-medium text-white whitespace-nowrap shadow-xl
          opacity-0 -translate-x-1 scale-95
          group-hover/tip:opacity-100 group-hover/tip:translate-x-0 group-hover/tip:scale-100
          transition-[opacity,transform] duration-200"
        style={{ transitionTimingFunction: EASE.spring }}
      >
        {label}
        <span className="absolute right-full top-1/2 -translate-y-1/2 border-4 border-transparent border-r-gray-900" />
      </div>
    </div>
  );
}

export function ProfileAction({
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
      text-gray-600 hover:bg-gray-50 hover:text-gray-900 transition-colors duration-150"
    >
      <span className="text-gray-400">{icon}</span>
      {label}
    </Link>
  );
}

export function UserAvatar({
  user,
  initials,
  size = "sm",
}: {
  user: User;
  initials: string;
  size?: "sm" | "md";
}) {
  const sz = size === "sm" ? "w-8 h-8 text-[11px]" : "w-9 h-9 text-xs";
  if (user.profile_picture) {
    return (
      <img
        src={user.profile_picture}
        alt={user.name}
        className={`${sz} rounded-full object-cover shrink-0 ring-2 ring-white`}
      />
    );
  }
  return (
    <div
      className={`${sz} rounded-full shrink-0 flex items-center justify-center
      font-bold text-white bg-gradient-to-br from-blue-500 to-indigo-600`}
    >
      {initials}
    </div>
  );
}

export function DropdownItem({
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
