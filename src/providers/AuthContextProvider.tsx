import { verifyToken } from "@/services/authService";
import { useQuery } from "@tanstack/react-query";
import {
  createContext,
  Dispatch,
  SetStateAction,
  useContext,
  useEffect,
  useState,
} from "react";

interface UserContextType {
  isAuthenticated: boolean;
  setIsAuthenticated: Dispatch<SetStateAction<boolean>>;
  isLoading: boolean;
}

export const AuthContext = createContext<UserContextType | undefined>(
  undefined
);

export default function AuthContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const { status, isLoading } = useQuery({
    queryKey: ["verifyToken"],
    queryFn: verifyToken,
    retry: 0,
  });

  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

  useEffect(() => {
    setIsAuthenticated(status === "success");
  }, [status]);

  return (
    <AuthContext.Provider
      value={{ isAuthenticated, setIsAuthenticated, isLoading }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export const useAuthContext = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuthContext must be used within a UserAuthProvider");
  }
  return context;
};
