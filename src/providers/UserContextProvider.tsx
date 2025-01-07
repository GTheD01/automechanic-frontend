import { createContext, useContext } from "react";
import { useQuery } from "@tanstack/react-query";

import { User } from "@/types/User";
import { fetchUser } from "@/services/userService";

interface UserContextType {
  user: User | undefined;
  status: "error" | "success" | "pending";
}

export const UserContext = createContext<UserContextType | undefined>(
  undefined
);

export default function UserContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const { data, status } = useQuery({
    queryKey: ["user"],
    queryFn: fetchUser,
    retry: 0,
  });

  return (
    <UserContext.Provider value={{ user: data, status }}>
      {children}
    </UserContext.Provider>
  );
}

export const useUserContext = () => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error("useUserContext must be used within a UserContextProvider");
  }
  return context;
};
