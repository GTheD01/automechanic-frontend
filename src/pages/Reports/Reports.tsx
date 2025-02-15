import UserReports from "./UserReports";
import AdminReports from "./AdminReports";
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
