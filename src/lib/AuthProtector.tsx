import { Navigate, Outlet } from "react-router-dom";

import Spinner from "@/components/Spinner";

import { useAuthContext } from "@/providers/AuthContextProvider";
import { useQuery } from "@tanstack/react-query";
import { verifyToken } from "@/services/authService";
import { useEffect, useState } from "react";

function AuthProtector() {
  const { isAuthenticated, setIsAuthenticated } = useAuthContext();
  const [isLoading, setIsLoading] = useState(true);

  const { isSuccess, isError } = useQuery({
    queryKey: ["verifyToken"],
    queryFn: verifyToken,
    retry: 1,
    staleTime: 1000 * 60 * 10,
    refetchOnWindowFocus: false,
  });

  useEffect(() => {
    if (isSuccess) {
      setIsAuthenticated(true);
      setIsLoading(false);
    } else if (isError) {
      setIsAuthenticated(false);
      setIsLoading(false);
    }
  }, [isSuccess, setIsAuthenticated]);

  if (isLoading) {
    return (
      <div className="bg-primary h-screen flex items-center justify-center">
        <Spinner lg />
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/customers/sign-in" />;
  }

  return <Outlet />;
}

export default AuthProtector;
