import { Link, useNavigate } from "react-router-dom";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import { logout } from "@/services/authService";
import { useAuthContext } from "@/providers/AuthContextProvider";

import SettingsIcon from "@/assets/svgs/settings.svg";
import LogoutIcon from "@/assets/svgs/logout.svg";
import UserProfileIcon from "@/assets/svgs/userprofile.svg";
import { useUserContext } from "@/providers/UserContextProvider";

const TopNavBar = () => {
  const navigate = useNavigate();

  const { user, setUser } = useUserContext();
  const { setIsAuthenticated } = useAuthContext();

  const queryClient = useQueryClient();

  const logoutMutation = useMutation({
    mutationFn: logout,
    onSuccess: () => {
      setIsAuthenticated(false);
      navigate("/sign-in");
      queryClient.clear();
    },
  });

  const handleLogout = () => {
    setUser(undefined);
    setIsAuthenticated(false);
    logoutMutation.mutate();
  };

  return (
    <header className="flex justify-between items-center p-8 mb-8 shadow-lg">
      <h2 className="text-sm sm:text-xl md:text-2xl">Automechanic</h2>
      <div className="flex">
        <div className="pl-4 relative group cursor-pointer">
          <div className="hover:opacity-70">
            <p className="text-sm sm:text-base md:text-xl">
              {!user && "Couldn't fetch user."}
              {user && `${user.firstName} ${user.lastName}`}
            </p>
          </div>

          <div
            className="absolute top-5 sm:top-6 right-0 bg-primary text-white opacity-0 pointer-events-none flex flex-col
        group-hover:opacity-100 group-hover:pointer-events-auto group-hover:visible transition-opacity duration-300 z-10 min-w-24"
          >
            <Link
              to={"profile"}
              className="hover:opacity-80 p-2 flex items-center gap-2"
            >
              <img
                src={UserProfileIcon}
                className="w-4 h-4"
                alt="User profile icon"
              />
              <span className="text-xs sm:text-sm md:text-base">Profile</span>
            </Link>
            <Link
              to={"settings"}
              className="hover:opacity-80 p-2 flex items-center gap-2"
            >
              <img src={SettingsIcon} className="w-4 h-4" alt="Settings icon" />
              <span className="text-xs sm:text-sm md:text-base">Settings</span>
            </Link>
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
};

export default TopNavBar;
