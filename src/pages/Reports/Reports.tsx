import AdminReports from "@/pages/Reports/AdminReports";
import { useUserContext } from "@/providers/UserContextProvider";
import UserLoggedReports from "@/pages/Reports/UserLoggedReports";

function Reports() {
  const { user } = useUserContext();

  if (!user) {
    return <p>Couldn't fetch user.</p>;
  }

  if (user.userRole === "ADMIN") {
    return <AdminReports />;
  }

  return <UserLoggedReports />;
}

export default Reports;
