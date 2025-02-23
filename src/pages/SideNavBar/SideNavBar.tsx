import AdminNavbar from "@/pages/SideNavBar/AdminNavbar";
import CustomerNavbar from "@/pages/SideNavBar/CustomerNavbar";
import { useUserContext } from "@/providers/UserContextProvider";

const SideNavBar = () => {
  const { user } = useUserContext();

  return (
    <nav className="bg-primary fixed w-14 sm:w-52 lg:w-64 h-full">
      {!user && <p>Failed to fetch user.</p>}
      {user && user.userRole === "ADMIN" ? <AdminNavbar /> : <CustomerNavbar />}
    </nav>
  );
};

export default SideNavBar;
