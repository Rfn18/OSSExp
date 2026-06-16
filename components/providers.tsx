"use client";

import { LayoutProvider } from "@/app/context/LayoutContext";
import { Toaster } from "@/components/ui/sonner";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <LayoutProvider>
      {children}
      <Toaster />
    </LayoutProvider>
  );
}
