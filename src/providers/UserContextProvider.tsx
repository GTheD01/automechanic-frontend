import { User } from "@/types/User";
import { createContext, useContext, useState } from "react";

interface UserContextType {
  user: User;
}

export const UserContext = createContext<UserContextType | undefined>(
  undefined
);

export default function UserContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [user, setUser] = useState<User>({
    email: "",
    firstName: "",
    lastName: "",
    role: undefined,
  });

  return (
    <UserContext.Provider value={{ user }}>{children}</UserContext.Provider>
  );
}

export const useUserContext = () => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error("useUserContext must be used within a UserContextProvider");
  }
  return context;
};
