"use client";

import { Bell, PanelRight, Search, Sun } from "lucide-react";
import { Input } from "../ui/input";
import { useLayout } from "@/app/context/LayoutContext";

export default function Header() {
  const { isSidebarOpen, setIsSidebarOpen } = useLayout();

  return (
    <header
      className={`
          sticky top-0 z-10 h-20 flex items-center justify-between
          border-b border-gray-200 bg-white px-4 sm:px-6 lg:px-10
          transition-all duration-300
          ${
            isSidebarOpen
              ? "lg:ml-64 lg:w-[calc(100%-16rem)]"
              : "lg:ml-20 lg:w-[calc(100%-5rem)]"
          }
     `}
    >
      <div className="flex items-center gap-4">
        <PanelRight
          size={20}
          className="text-gray-600 cursor-pointer hover:text-black transition-colors"
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
        />
        <div className="hidden sm:flex items-center gap-1 text-sm">
          <h1 className="text-gray-500">Dashboard</h1>
          <p className="text-gray-300">/</p>
          <h1 className="font-semibold text-gray-900">Default</h1>
        </div>
        <h1 className="sm:hidden text-base text-gray-500 truncate">
          Dashboard
        </h1>
      </div>
      <div className="flex items-center gap-2 sm:gap-4">
        <div className="relative hidden sm:block">
          <Search
            size={16}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none"
          />
          <Input
            placeholder="Cari event..."
            className="pl-9 h-10 text-sm rounded-lg w-48 lg:w-64 border border-gray-200 focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-1"
          />
        </div>

        <div className="flex items-center gap-1 sm:gap-2">
          <div className="sm:hidden p-2 hover:bg-gray-100 transition cursor-pointer rounded-full">
            <Search size={18} className="text-gray-600" />
          </div>

          <div className="p-2 hover:bg-gray-100 transition cursor-pointer rounded-full">
            <Sun size={18} className="text-gray-600" />
          </div>

          <div className="p-2 hover:bg-gray-100 transition cursor-pointer rounded-full relative">
            <Bell size={18} className="text-gray-600" />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full"></span>
          </div>

          <div className="p-2 hover:bg-gray-100 transition cursor-pointer rounded-full">
            <PanelRight size={18} className="text-gray-600" />
          </div>
        </div>
      </div>
    </header>
  );
}
