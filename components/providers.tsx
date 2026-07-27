"use client";

import { LayoutProvider } from "@/app/context/LayoutContext";
import { Toaster } from "@/components/ui/sonner";
import { SWRProvider } from "@/app/providers/swrProviders";
import { AuthProvider } from "@/app/context/AuthContext";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <AuthProvider>
      <SWRProvider>
        <LayoutProvider>
          {children}
          <Toaster />
        </LayoutProvider>
      </SWRProvider>
    </AuthProvider>
  );
}
