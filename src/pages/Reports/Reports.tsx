import UserReports from "@/pages/Reports/UserReports";
import AdminReports from "@/pages/Reports/AdminReports";
import { useUserContext } from "@/providers/UserContextProvider";

function Reports() {
  const { user } = useUserContext();

  if (!user) {
    return <p>Couldn't fetch user.</p>;
  }

  if (user.userRole === "ADMIN") {
    return <AdminReports />;
  }

  return <UserReports />;
}

export default Reports;
