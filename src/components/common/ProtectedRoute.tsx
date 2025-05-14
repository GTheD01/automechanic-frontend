import { useUserContext } from "@/providers/UserContextProvider";
import { UserRole } from "@/types/User";
import { PropsWithChildren } from "react";
import { Navigate } from "react-router-dom";

interface ProtectedRouteProps {
  role: UserRole;
}

function ProtectedRoute({
  children,
  role,
}: PropsWithChildren<ProtectedRouteProps>) {
  const { user } = useUserContext();

  if (!user) {
    return <Navigate to={"/sign-in"} />;
  }

  if (user?.userRole !== role) {
    return <Navigate to={"/dashboard"} />;
  }

  return children;
}

export default ProtectedRoute;
