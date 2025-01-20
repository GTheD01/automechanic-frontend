import { useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";

import { logout } from "@/services/authService";
import { useAuthContext } from "@/providers/AuthContextProvider";

import SettingsIcon from "@/assets/svgs/settings.svg";
import LogoutIcon from "@/assets/svgs/logout.svg";
import { useUserContext } from "@/providers/UserContextProvider";

function TopNavBar() {
  const navigate = useNavigate();

  const { setIsAuthenticated } = useAuthContext();
  const { user } = useUserContext();

  const logoutMutation = useMutation({
    mutationFn: logout,
    onSuccess: () => {
      setIsAuthenticated(false);
      navigate("/sign-in");
    },
  });

  const handleLogout = () => {
    logoutMutation.mutate();
  };

  return (
    <header className="flex justify-between items-center p-8 mb-8 shadow-lg">
      <h2 className="text-sm sm:text-xl md:text-2xl">Automechanic</h2>
      <div className="flex">
        <div className="pl-4 relative group cursor-pointer">
          <div className="hover:opacity-70">
            <p className="text-sm sm:text-base md:text-xl">
              {user?.firstName} {user?.lastName}
            </p>
          </div>

          <div
            className="absolute top-5 sm:top-6 right-0 bg-primary text-white opacity-0 pointer-events-none flex flex-col
        group-hover:opacity-100 group-hover:pointer-events-auto group-hover:visible transition-opacity duration-300"
          >
            <button className="hover:opacity-80 p-2 flex items-center gap-2">
              <img src={SettingsIcon} className="w-4 h-4" alt="Settings icon" />
              <span className="text-xs sm:text-sm md:text-base">Settings</span>
            </button>
            <button
              onClick={handleLogout}
              className="hover:opacity-80 p-2 flex items-center gap-2"
            >
              <img src={LogoutIcon} className="w-4 h-4" alt="Logout icon" />
              <span className="text-xs sm:text-sm md:text-base">Logout</span>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}

export default TopNavBar;
