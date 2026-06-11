"use client";

import { LayoutProvider } from "@/app/context/LayoutContext";
import Header from "@/components/admin/header";
import Sidebar from "@/components/admin/sidebar";

export default function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const defaultBgColor = "#F8FAFE";
  
  return (
    <LayoutProvider>
      <div className={`min-w-screen h-screen bg-[${defaultBgColor}]`}>
        <Header />
        <Sidebar />
        <main className={`flex-1 overflow-y-auto mt-18`}>{children}</main>
      </div>
    </LayoutProvider>
  );
}
