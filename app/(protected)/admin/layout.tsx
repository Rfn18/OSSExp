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
  
  // 1. PASTIKAN ANDA MENGAMBIL FUNGSI SETTER DARI CONTEXT
  const { 
    isSidebarLeftOpen, 
    isSidebarRightOpen, 
    setIsSidebarLeftOpen // <--- TAMBAHKAN INI (Sesuaikan dengan nama di Context Anda)
  } = useLayout();

  const sidebarClass = isSidebarLeftOpen
    ? "lg:ml-64 lg:w-[calc(100%-16rem)]"
    : "lg:ml-20 lg:w-[calc(100%-5rem)]";
    
  const sidebarRightClass = isSidebarRightOpen
    ? "lg:w-[calc(100%-16rem)]"
    : "lg:w-[calc(100%-5rem)]";

  // 2. FUNGSI HANDLER UNTUK AREA BODY (MAIN)
  const handleMainClick = () => {
    // Breakpoint 'lg' di Tailwind adalah 1024px.
    // Hanya tutup sidebar jika layar < 1024px (Mobile/Tablet kecil) DAN sidebar sedang terbuka
    if (window.innerWidth < 1024 && isSidebarLeftOpen) {
      setIsSidebarLeftOpen(false);
    }
  };

  return (
    // Tambahkan 'relative' dan 'overflow-x-hidden' agar overlay dan sidebar tidak bikin scroll horizontal
    <div className={`w-full h-screen bg-[${defaultBgColor}] relative overflow-x-hidden`}>
      <Header />

      {/* 3. OVERLAY MOBILE (Sangat Direkomendasikan untuk UX) */}
      {/* Overlay ini akan muncul sebagai latar gelap saat sidebar mobile terbuka */}
      {isSidebarLeftOpen && (
        <div 
          onClick={() => setIsSidebarLeftOpen(false)}
          className="fixed inset-0 bg-black/50 z-30 lg:hidden transition-opacity"
        />
      )}

      {/* PENTING: Pastikan di dalam komponen <SidebarLeft />, z-index nya lebih tinggi dari overlay (misal z-40) */}
      <SidebarLeft /> 

      <main
        className={`flex-1 overflow-y-auto p-10 transition-all duration-300 ease-in-out ${sidebarClass}`}
        onClick={handleMainClick} // <--- PASANG EVENT LISTENER DI SINI
      >
        {children}
      </main>
      
      <SidebarRight />
    </div>
  );
}