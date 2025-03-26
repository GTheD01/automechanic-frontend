import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";

import Spinner from "@/components/Spinner";
import { getUserReports } from "@/services/reportService";
import UserReportsList from "../Reports/components/UserReportsList";

function UserReports() {
  const { userId } = useParams();

  const { data, isLoading, isError } = useQuery({
    queryKey: ["userReports"],
    queryFn: () => getUserReports(userId),
    enabled: !!userId,
  });

  return (
    <>
      {isLoading && <Spinner lg />}
      {data && data.length < 1 && (
        <p className="pl-2 pt-2">User has no reports.</p>
      )}
      {isError && (
        <p className="pl-2 pt-2">
          There was an error fetching your reports. Please try again later.
        </p>
      )}
      {data && <UserReportsList reports={data} />}
    </>
  );
}

export default UserReports;
