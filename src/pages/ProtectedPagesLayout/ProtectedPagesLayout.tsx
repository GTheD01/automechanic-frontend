import { Navigate, Outlet } from "react-router-dom";
import SideNavBar from "../SideNavBar/SideNavBar";
import { useUserContext } from "@/providers/UserContextProvider";

function ProtectedPagesLayout() {
  const { user, status } = useUserContext();

  if (status === "error") {
    return <Navigate to="/customer/sign-in" />;
  }

  return (
    <div className="h-full flex">
      <SideNavBar />
      <div className="text-primary flex-grow">
        <div className="flex justify-between items-center p-8 mb-8 shadow-lg">
          <h2 className="text-2xl">Automechanic</h2>
          <div className="flex">
            <button className="pr-4 hover:opacity-70">Message</button>
            <button className="border-x-2 px-4 hover:opacity-70">
              Settings
            </button>
            <div className="pl-4 relative group cursor-pointer">
              <div className="hover:opacity-70">
                <p>
                  {user?.firstName} {user?.lastName}
                </p>
              </div>

              <div
                className="absolute top-5 right-0 bg-primary text-white opacity-0 pointer-events-none 
                group-hover:opacity-100 group-hover:pointer-events-auto group-hover:visible transition-opacity duration-300"
              >
                <button
                  onClick={() => console.log("Logout")}
                  className="p-2 hover:opacity-80"
                >
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
