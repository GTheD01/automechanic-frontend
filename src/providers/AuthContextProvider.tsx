import { createContext, useContext, useState } from "react";

interface AuthProviderType {
  isAuthenticated: boolean;
  isLoading: boolean;
}

export const AuthProvider = createContext<AuthProviderType | undefined>(
  undefined
);

export default function AuthContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(true);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  return (
    <AuthProvider.Provider value={{ isAuthenticated, isLoading }}>
      {children}
    </AuthProvider.Provider>
  );
}

export const useAuthContext = () => {
  const context = useContext(AuthProvider);
  if (context === undefined) {
    throw new Error("useAuthContext must be used within a AuthContextProvider");
  }
  return context;
};
