"use client";
import { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  // Load token/user from localStorage on mount
  useEffect(() => {
    const stored = localStorage.getItem("admin");
    if (stored) setUser(JSON.parse(stored));
  }, []);

  // Login method (store in localStorage)
  const login = (data) => {
    localStorage.setItem("admin", JSON.stringify(data));
    setUser(data);
  };

  // Logout method
  const logout = () => {
    localStorage.removeItem("admin");
    setUser(null);
  };

  const isAdmin = !!user;

  return (
    <AuthContext.Provider value={{ user, isAdmin, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
