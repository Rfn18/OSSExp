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
        revalidateOnFocus: false,      
        revalidateOnReconnect: true,   
        dedupingInterval: 2000,        
        errorRetryCount: 3,            
        errorRetryInterval: 2000,      
      }}
    >
      {children}
    </SWRConfig>
  );
}