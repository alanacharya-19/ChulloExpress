import React, { createContext, useCallback, useContext, useMemo, useState } from "react";

type UserData = {
  name: string;
  email: string;
  phone: string;
  address: string;
};

type UserContextType = UserData & {
  updateUser: (data: Partial<UserData>) => void;
};

const UserContext = createContext<UserContextType | null>(null);

export function UserProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<UserData>({
    name: "Alan Shrestha",
    email: "alan@example.com",
    phone: "+977-9841234567",
    address: "Bangesimal-1, Surkhet, Nepal",
  });

  const updateUser = useCallback((data: Partial<UserData>) => {
    setUser((prev) => ({ ...prev, ...data }));
  }, []);

  const value = useMemo(() => ({ ...user, updateUser }), [user, updateUser]);

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
}

export function useUser() {
  const ctx = useContext(UserContext);
  if (!ctx) throw new Error("useUser must be used within UserProvider");
  return ctx;
}
