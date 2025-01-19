import { Link, Navigate, Outlet } from "react-router-dom";
import exitArrowSvg from "@/assets/svgs/exit-arrow.svg";

import { useAuthContext } from "@/providers/AuthContextProvider";

function AuthPagesLayout() {
  const { isAuthenticated } = useAuthContext();

  if (isAuthenticated) {
    return <Navigate to={"/customers/dashboard"} />;
  }

  return (
    <div className="bg-primary h-full flex flex-col items-center justify-center w-full">
      <Link
        to={"/"}
        className="absolute left-4 top-4 hover:text-neutral flex items-center gap-2"
      >
        <img src={exitArrowSvg} alt="exit arrow" className="w-6 h-6" />
        <p>Back to Main Page</p>
      </Link>
      <h2 className="lg:text-5xl md:text-4xl text-3xl font-bold tracking-wider">
        <span className="text-sky-200 bold">Auto</span> Mechanic
      </h2>
      <Outlet />
    </div>
  );
}

export default AuthPagesLayout;
