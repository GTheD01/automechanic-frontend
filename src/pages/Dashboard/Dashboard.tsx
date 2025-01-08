import { useUserContext } from "@/providers/UserContextProvider";
import CustomerDashboard from "./CustomerDashboard";
import AdminDashboard from "./AdminDashboard";

function Dashboard() {
  const { user } = useUserContext();

  if (user?.userRole === "ADMIN") {
    return <AdminDashboard />;
  }

  return <CustomerDashboard />;
}

export default Dashboard;
