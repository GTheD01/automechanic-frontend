import { Navigate, Outlet } from "react-router-dom";

import Spinner from "@/components/Spinner";

import { useUserContext } from "@/providers/UserContextProvider";

function AuthProtector() {
  const { status, user } = useUserContext();

  if (status === "pending") {
    return (
      <div className="bg-primary h-screen flex items-center justify-center">
        <Spinner lg />
      </div>
    );
  }

  if (!user?.userRole) {
    console.log("User is not authenticated");
    return <Navigate to="/customer/sign-in" />;
  }

  return <Outlet />;
}

export default AuthProtector;
