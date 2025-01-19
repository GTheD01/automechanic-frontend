import { useUserContext } from "@/providers/UserContextProvider";
import CustomerDashboard from "@/pages/Dashboard/CustomerDashboard";
import AdminDashboard from "@/pages/Dashboard/AdminDashboard";

function Dashboard() {
  const { user } = useUserContext();

  if (user?.userRole === "ADMIN") {
    return <AdminDashboard />;
  }

  return <CustomerDashboard />;
}

export default Dashboard;
