"use client";

import { SWRConfig } from "swr";
import api from "../services/api";
import { ReactNode } from "react";

const fetcher = (url: string) => api.get(url).then((res) => res.data);

export function SWRProvider({ children }: { children: ReactNode }) {
  return (
    <SWRConfig
      value={{
        fetcher,
        revalidateOnFocus: false,      // Jangan refetch saat user kembali ke tab
        revalidateOnReconnect: true,   // Refetch saat koneksi internet pulih
        dedupingInterval: 2000,        // Cegah request duplikat dalam 2 detik
        errorRetryCount: 3,            // Retry maksimal 3x jika error
        errorRetryInterval: 2000,      // Jeda 2 detik sebelum retry
      }}
    >
      {children}
    </SWRConfig>
  );
}