import React, { createContext, useEffect, useState } from "react";
import { authUser } from "@/services/authService";

type User = Record<string, unknown> | null;

type AuthContextType = {
  user: User;
  token: string | null;
  loading: boolean;
  login: (
    email: string,
    password: string
  ) => Promise<{ user: User; token: string }>;
  logout: () => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<User>(() => {
    try {
      const raw = localStorage.getItem("user");
      return raw ? JSON.parse(raw) : null;
    } catch {
      return null;
    }
  });
  const [token, setToken] = useState<string | null>(() =>
    localStorage.getItem("token")
  );
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const onStorage = (e: StorageEvent) => {
      if (e.key === "token") setToken(e.newValue as string | null);
      if (e.key === "user") setUser(e.newValue ? JSON.parse(e.newValue) : null);
    };
    window.addEventListener("storage", onStorage);

    const onAuthChange = () => {
      setToken(localStorage.getItem("token"));
      try {
        const raw = localStorage.getItem("user");
        setUser(raw ? JSON.parse(raw) : null);
      } catch {
        setUser(null);
      }
    };
    window.addEventListener("authChange", onAuthChange as EventListener);

    return () => {
      window.removeEventListener("storage", onStorage);
      window.removeEventListener("authChange", onAuthChange as EventListener);
    };
  }, []);

  const login = async (email: string, password: string) => {
    setLoading(true);
    try {
      const { user: u, token: t } = await authUser({ email, password });
      localStorage.setItem("token", t);
      localStorage.setItem("user", JSON.stringify(u));
      setUser(u as User);
      setToken(t);
      window.dispatchEvent(new CustomEvent("authChange"));
      return { user: u as User, token: t };
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null);
    setToken(null);
    window.dispatchEvent(new CustomEvent("authChange"));
  };

  return (
    <AuthContext.Provider value={{ user, token, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
