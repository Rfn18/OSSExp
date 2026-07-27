"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import { AuthData, User } from "@/app/types/userType";

type AuthContextType = {
  auth: AuthData | null;
  user: User | null;
  token: string | null;
  login: (data: AuthData) => void;
  logout: () => void;
  isAuthenticated: boolean;
};

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [auth, setAuth] = useState<AuthData | null>(null);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    const stored = localStorage.getItem("auth");
    if (stored) {
      try {
        const parsed: AuthData = JSON.parse(stored);
        setAuth(parsed);
      } catch (error) {
        console.error("Failed to parse auth:", error);
        localStorage.removeItem("auth");
      }
    }
  }, []);

  const login = (data: AuthData) => {
    localStorage.setItem("auth", JSON.stringify(data));
    setAuth(data);
  };

  const logout = () => {
    localStorage.removeItem("auth");
    setAuth(null);
  };


  return (
    <AuthContext.Provider
      value={{
        auth,
        user: auth?.user || null,
        token: auth?.token || null,
        login,
        logout,
        isAuthenticated: !!auth?.token,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within AuthProvider");
  }
  return context;
};
