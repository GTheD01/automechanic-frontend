import { useUserContext } from "@/providers/UserContextProvider";
import AdminNavbar from "./AdminNavbar";
import CustomerNavbar from "./CustomerNavbar";

function SideNavBar() {
  const { user } = useUserContext();

  return (
    <nav className="bg-primary fixed w-14 sm:w-52 lg:w-64 h-full">
      {user?.userRole === "ADMIN" ? <AdminNavbar /> : <CustomerNavbar />}
    </nav>
  );
}

export default SideNavBar;
