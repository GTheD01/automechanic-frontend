import { useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { Navigate, Outlet } from "react-router-dom";

import TopNavBar from "./components/TopNavBar";
import SideNavBar from "../SideNavBar/SideNavBar";
import { fetchUser } from "@/services/userService";
import { useUserContext } from "@/providers/UserContextProvider";

function ProtectedPagesLayout() {
  const { setUser } = useUserContext();
  const { data, status } = useQuery({
    queryKey: ["user"],
    queryFn: fetchUser,
    retry: 0,
  });

  if (status === "error") {
    <Navigate to={"/customers/sign-in"} />;
  }

  useEffect(() => {
    setUser(data);
  }, [data]);

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
