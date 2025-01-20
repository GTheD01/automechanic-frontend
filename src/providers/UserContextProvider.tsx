import {
  createContext,
  Dispatch,
  SetStateAction,
  useContext,
  useEffect,
  useState,
} from "react";

import { User } from "@/types/User";
import { useQuery } from "@tanstack/react-query";
import { fetchUser } from "@/services/userService";

interface UserContextType {
  user: User | undefined;
  setUser: Dispatch<SetStateAction<User | undefined>>;
}

export const UserContext = createContext<UserContextType | undefined>(
  undefined
);

export default function UserContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [user, setUser] = useState<User | undefined>(undefined);

  const { data } = useQuery({
    queryKey: ["user"],
    queryFn: fetchUser,
    retry: 0,
  });

  useEffect(() => {
    setUser(data);
  }, [data]);

  return (
    <UserContext.Provider value={{ user, setUser }}>
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
