import { Navigate, Outlet, useNavigate } from "react-router-dom";
import SideNavBar from "../SideNavBar/SideNavBar";
import { useUserContext } from "@/providers/UserContextProvider";

import MessageIcon from "@/assets/svgs/message.svg";
import SettingsIcon from "@/assets/svgs/settings.svg";
import { useMutation } from "@tanstack/react-query";
import { logout } from "@/services/authService";

function ProtectedPagesLayout() {
  const navigate = useNavigate();
  const { user, status } = useUserContext();

  if (status === "error") {
    return <Navigate to="/customer/sign-in" />;
  }

  const logoutMutation = useMutation({
    mutationFn: logout,
    onSuccess: () => {
      navigate("/customer/sign-in");
    },
  });

  const handleLogout = () => {
    logoutMutation.mutate();
  };

  return (
    <div className="h-full flex">
      <SideNavBar />
      <div className="text-primary flex-grow">
        <div className="flex justify-between items-center p-8 mb-8 shadow-lg">
          <h2 className="text-2xl">Automechanic</h2>
          <div className="flex">
            <button className="pr-4 hover:opacity-70">
              <img src={MessageIcon} className="w-6 h-6" alt="Message icon" />
            </button>
            <button className="border-x-2 px-4 hover:opacity-70">
              <img src={SettingsIcon} className="w-6 h-6" alt="Settings icon" />
            </button>
            <div className="pl-4 relative group cursor-pointer">
              <div className="hover:opacity-70">
                <p>
                  {user?.firstName} {user?.lastName}
                </p>
              </div>

              <div
                className="absolute top-6 right-0 bg-primary text-white opacity-0 pointer-events-none
                group-hover:opacity-100 group-hover:pointer-events-auto group-hover:visible transition-opacity duration-300"
              >
                <button onClick={handleLogout} className="p-2 hover:opacity-80">
                  Logout
                </button>
              </div>
            </div>
          </div>
        </div>
        <Outlet />
      </div>
    </div>
  );
}

export default ProtectedPagesLayout;
