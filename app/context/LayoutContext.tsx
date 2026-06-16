"use client";

import { createContext, useContext, useState } from "react";

type LayoutContextProps = {
  isMobile: boolean;
  isSidebarLeftOpen: boolean;
  isSidebarRightOpen: boolean;
  setIsMobile: (isMobile: boolean) => void;
  setIsSidebarLeftOpen: (isSidebarLeftOpen: boolean) => void;
  setIsSidebarRightOpen: (isSidebarRightOpen: boolean) => void;
};

const LayoutContext = createContext<LayoutContextProps | undefined>(undefined);

export const LayoutProvider = ({ children }: { children: React.ReactNode }) => {
  const [isSidebarLeftOpen, setIsSidebarLeftOpen] = useState(false);
  const [isSidebarRightOpen, setIsSidebarRightOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  return (
    <LayoutContext.Provider
      value={{
        isMobile,
        isSidebarLeftOpen,
        isSidebarRightOpen,
        setIsMobile,
        setIsSidebarLeftOpen,
        setIsSidebarRightOpen,
      }}
    >
      {children}
    </LayoutContext.Provider>
  );
};

export const useLayout = () => {
  const context = useContext(LayoutContext);
  if (!context) {
    throw new Error("useLayout must be used within LayoutProvider");
  }
  return context;
};
