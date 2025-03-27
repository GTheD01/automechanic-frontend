import { useCallback, useState } from "react";
import { useQuery } from "@tanstack/react-query";

import Button from "@/components/Button";
import Spinner from "@/components/Spinner";
import { Pagination } from "@/components/Pagination";
import { getLoggedInUserReports } from "@/services/reportService";
import UserReportsList from "@/pages/Reports/components/UserReportsList";
import CreateReportModal from "@/pages/Reports/components/CreateReportModal";

function UserLoggedReports() {
  const [createReportModal, setCreateReportModal] = useState<boolean>(false);
  const [currentPage, setCurrentPage] = useState(1);

  const { data, isLoading, isError } = useQuery({
    queryKey: ["reports", "5", currentPage - 1],
    queryFn: getLoggedInUserReports,
    retry: 0,
  });

  const onCloseCreateReportModal = () => {
    setCreateReportModal(false);
  };

  const handleCurrentPage = useCallback(
    (el: number) => {
      setCurrentPage(el);
    },
    [currentPage]
  );

  return (
    <section>
      <CreateReportModal
        modalState={createReportModal}
        onClose={onCloseCreateReportModal}
      />
      <Button
        className="py-2 px-4 rounded-3xl ml-2"
        onClick={() => setCreateReportModal(true)}
      >
        Create report
      </Button>
      {isLoading && <Spinner md />}
      {isError && (
        <p className="ml-2 mt-2">
          There was an error fetching your reports. Please try again later.
        </p>
      )}
      {data && data.content && data.content.length < 1 && (
        <p className="ml-2 mt-2">No reports found.</p>
      )}
      {data && <UserReportsList reports={data.content} />}

      {data && data.page && (
        <Pagination
          currentPage={currentPage}
          handleCurrentPage={handleCurrentPage}
          totalPages={data.page.totalPages}
        />
      )}
    </section>
  );
}

export default UserLoggedReports;
