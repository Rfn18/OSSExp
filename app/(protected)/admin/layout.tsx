"use client";

import Header from "@/components/admin/header";
import { SidebarLeft, SidebarRight } from "@/components/admin/sidebar";
import { useLayout } from "@/app/context/LayoutContext";

export default function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const defaultBgColor = "#F8FAFE";

  const { isSidebarLeftOpen, isSidebarRightOpen, setIsSidebarLeftOpen } =
    useLayout();

  const sidebarClass = isSidebarLeftOpen
    ? "lg:ml-64 lg:w-[calc(100%-16rem)]"
    : "lg:ml-20 lg:w-[calc(100%-5rem)]";

  const sidebarRightClass = isSidebarRightOpen
    ? "lg:w-[calc(100%-16rem)]"
    : "lg:w-[calc(100%-5rem)]";

  const handleMainClick = () => {
    if (window.innerWidth < 1024 && isSidebarLeftOpen) {
      setIsSidebarLeftOpen(false);
    }
  };

  return (
    <div
      className={`w-full h-screen bg-[${defaultBgColor}] relative overflow-x-hidden`}
    >
      <Header />

      {isSidebarLeftOpen && (
        <div
          onClick={() => setIsSidebarLeftOpen(false)}
          className="fixed inset-0 bg-black/50 z-30 lg:hidden transition-opacity"
        />
      )}

      <SidebarLeft />

      <main
        className={`flex-1 overflow-y-auto p-10 transition-all duration-300 ease-in-out ${sidebarClass}`}
        onClick={handleMainClick}
      >
        {children}
      </main>

      <SidebarRight />
    </div>
  );
}
