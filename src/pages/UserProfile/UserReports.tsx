import { useParams } from "react-router-dom";
import { useCallback, useState } from "react";
import { useQuery } from "@tanstack/react-query";

import { User } from "@/types/User";
import Spinner from "@/components/Spinner";
import { Pagination } from "@/components/Pagination";
import { getUserReports } from "@/services/reportService";
import UserReportsList from "../Reports/components/UserReportsList";

const TOTAL_REPORTS_PER_PAGE = 5;

function UserReports() {
  const { userId } = useParams<User["id"]>();
  const [currentPage, setCurrentPage] = useState(1);

  const { data, isLoading, isError } = useQuery({
    queryKey: ["userReports", TOTAL_REPORTS_PER_PAGE, currentPage - 1, userId],
    queryFn: getUserReports,
    enabled: !!userId,
    retry: 0,
  });

  const handleCurrentPage = useCallback(
    (el: number) => {
      setCurrentPage(el);
    },
    [currentPage]
  );

  return (
    <>
      {isLoading && <Spinner lg />}
      {data && data.content && data.content.length < 1 && (
        <p className="pl-2 pt-2">User has no reports.</p>
      )}
      {isError && (
        <p className="pl-2 pt-2">
          There was an error fetching your reports. Please try again later.
        </p>
      )}
      {data && <UserReportsList reports={data.content} />}

      {data && data.page && (
        <Pagination
          currentPage={currentPage}
          handleCurrentPage={handleCurrentPage}
          totalPages={data.page.totalPages}
        />
      )}
    </>
  );
}

export default UserReports;
