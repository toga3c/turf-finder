import React, { createContext, useContext, useState } from "react";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  const login = ({ name, role }) => {
    const newUser = { name, role };
    setUser(newUser);
    return newUser;
  };

  const logout = () => setUser(null);

  const isOwner = user?.role === "owner";
  const isPlayer = user?.role === "player";

  return (
    <AuthContext.Provider value={{ user, login, logout, isOwner, isPlayer }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used inside <AuthProvider>");
  return ctx;
}