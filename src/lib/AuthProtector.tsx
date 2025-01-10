import { Navigate, Outlet } from "react-router-dom";

import Spinner from "@/components/Spinner";

import { useAuthContext } from "@/providers/AuthContextProvider";

function AuthProtector() {
  const { isAuthenticated, isLoading } = useAuthContext();

  if (isLoading) {
    return (
      <div className="bg-primary h-screen flex items-center justify-center">
        <Spinner lg />
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/customer/sign-in" />;
  }

  return <Outlet />;
}

export default AuthProtector;
