import { useUserContext } from "@/providers/UserContextProvider";
import AdminNavbar from "./AdminNavbar";
import CustomerNavbar from "./CustomerNavbar";

function SideNavBar() {
  const { user } = useUserContext();

  if (user?.role === "ADMIN") {
    return <AdminNavbar />;
  }

  return <CustomerNavbar />;
}

export default SideNavBar;
