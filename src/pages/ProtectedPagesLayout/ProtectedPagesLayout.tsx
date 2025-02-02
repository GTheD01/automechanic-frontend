import { Navigate, Outlet } from "react-router-dom";

import Spinner from "@/components/Spinner";
import SideNavBar from "@/pages/SideNavBar/SideNavBar";
import { useAuthContext } from "@/providers/AuthContextProvider";
import TopNavBar from "@/pages/ProtectedPagesLayout/components/TopNavBar";

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
        <main>
          <Outlet />
        </main>
      </div>
    </div>
  );
}

export default ProtectedPagesLayout;
