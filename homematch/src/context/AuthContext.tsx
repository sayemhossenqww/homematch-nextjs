"use client";
import { createContext, useContext, useState, useEffect, type ReactNode } from "react";
import { getStoredUser, persistUser, clearUser, type HmUser } from "@/lib/auth";

interface AuthCtx {
  user: HmUser | null;
  updateUser: (u: HmUser) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthCtx>({ user: null, updateUser: () => {}, logout: () => {} });

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<HmUser | null>(null);

  useEffect(() => {
    setUser(getStoredUser());
    const sync = () => setUser(getStoredUser());
    window.addEventListener("hm-auth-change", sync);
    window.addEventListener("storage", sync); // cross-tab sync
    return () => {
      window.removeEventListener("hm-auth-change", sync);
      window.removeEventListener("storage", sync);
    };
  }, []);

  function updateUser(u: HmUser) {
    persistUser(u); // also dispatches hm-auth-change → setUser called via listener
  }

  function logout() {
    clearUser(); // also dispatches hm-auth-change → setUser(null) via listener
  }

  return <AuthContext.Provider value={{ user, updateUser, logout }}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  return useContext(AuthContext);
}
