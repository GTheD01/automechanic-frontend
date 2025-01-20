import { Navigate, Outlet } from "react-router-dom";

import TopNavBar from "./components/TopNavBar";
import SideNavBar from "../SideNavBar/SideNavBar";
import { useAuthContext } from "@/providers/AuthContextProvider";
import Spinner from "@/components/Spinner";

function ProtectedPagesLayout() {
  const { isAuthenticated, isLoading } = useAuthContext();

  if (isLoading) {
    return <Spinner lg />;
  }

  if (!isAuthenticated) {
    return <Navigate to={"/sign-in"} />;
  }

  return (
    <div className="h-full flex">
      <SideNavBar />
      <div className="text-primary flex-grow ml-14 sm:ml-52 lg:ml-64">
        <TopNavBar />
        <Outlet />
      </div>
    </div>
  );
}

export default ProtectedPagesLayout;
