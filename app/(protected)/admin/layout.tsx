"use client";

import Header from "@/components/admin/Header";
import { SidebarLeft, SidebarRight } from "@/components/admin/Sidebar";
import { useLayout } from "@/app/context/LayoutContext";

export default function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const defaultBgColor = "#F8FAFE";
  const { isSidebarLeftOpen, isSidebarRightOpen } = useLayout();
  const sidebarClass = isSidebarLeftOpen
    ? "lg:ml-64 lg:w-[calc(100%-16rem)]"
    : "lg:ml-20 lg:w-[calc(100%-5rem)]";
  const sidebarRightClass = isSidebarRightOpen
    ? "lg:w-[calc(100%-16rem)]"
    : "lg:w-[calc(100%-5rem)]";

  return (
    <div className={`w-full h-screen bg-[${defaultBgColor}]`}>
      <Header />
      <SidebarLeft />
      <main
        className={`flex-1 overflow-y-auto p-10 transition-all duration-300 ease-in-out ${sidebarClass}`}
      >
        {children}
      </main>
      <SidebarRight />
    </div>
  );
}
