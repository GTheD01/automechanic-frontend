import {
  createContext,
  Dispatch,
  PropsWithChildren,
  SetStateAction,
  useContext,
  useEffect,
  useState,
} from "react";
import { useQuery } from "@tanstack/react-query";

import { verifyToken } from "@/services/authService";

interface AuthContextType {
  isAuthenticated: boolean;
  setIsAuthenticated: Dispatch<SetStateAction<boolean>>;
  isLoading: boolean;
  setIsLoading: Dispatch<SetStateAction<boolean>>;
}

export const AuthContext = createContext<AuthContextType | undefined>(
  undefined
);

export default function AuthContextProvider({ children }: PropsWithChildren) {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState(true);

  const { isSuccess, isPending, isError } = useQuery({
    queryKey: ["verifyToken"],
    queryFn: verifyToken,
    retry: 0,
    staleTime: 1000 * 60 * 10,
    refetchOnWindowFocus: false,
  });

  useEffect(() => {
    if (isPending) {
      setIsLoading(true);
      return;
    }

    if (isSuccess) {
      setIsAuthenticated(true);
      setIsLoading(false);
    }

    if (isError) {
      setIsAuthenticated(false);
      setIsLoading(false);
    }
  }, [isSuccess, isError, isPending]);

  return (
    <AuthContext.Provider
      value={{ isAuthenticated, setIsAuthenticated, isLoading, setIsLoading }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export const useAuthContext = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuthContext must be used within a AuthContextProvider");
  }
  return context;
};
