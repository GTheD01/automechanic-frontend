import { toast } from "react-toastify";
import { useCallback, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import { Report } from "@/types/Report";
import Spinner from "@/components/Spinner";
import { Pagination } from "@/components/Pagination";
import { PageableResponse } from "@/types/GlobalTypes";
import { deleteReport, getAllReports } from "@/services/reportService";
import AdminReportsList from "@/pages/Reports/components/AdminReportsList";
import DeleteConfirmationModal from "@/components/DeleteConfirmationModal";
import AnswerReportModal from "@/pages/Reports/components/AnswerReportModal";

const TOTAL_REPORTS_PER_PAGE = 5;

function AdminReports() {
  const [currentPage, setCurrentPage] = useState(1);
  const { data, isLoading, isError } = useQuery({
    queryKey: ["reports", TOTAL_REPORTS_PER_PAGE, currentPage - 1],
    queryFn: getAllReports,
  });
  const [selectedReportId, setSelectedReportId] = useState<string>("");
  const [answerReportModal, setAnswerReportModal] = useState<boolean>(false);
  const [deleteReportModal, setDeleteReportModal] = useState<boolean>(false);

  const onCloseAnswerReportModal = () => {
    setAnswerReportModal(false);
    setSelectedReportId("");
  };

  const onCloseDeleteReportModal = () => {
    setDeleteReportModal(false);
    setSelectedReportId("");
  };

  const onOpenAnswerReportModal = useCallback(
    (reportId: string) => {
      setSelectedReportId(reportId);
      setAnswerReportModal(true);
    },
    [answerReportModal]
  );

  const onOpenDeleteReportModal = useCallback((reportId: string) => {
    setSelectedReportId(reportId);
    setDeleteReportModal(true);
  }, []);

  const handleCurrentPage = useCallback(
    (el: number) => {
      setCurrentPage(el);
    },
    [currentPage]
  );

  const queryClient = useQueryClient();

  const deleteReportMutation = useMutation({
    mutationKey: ["reports", TOTAL_REPORTS_PER_PAGE, currentPage - 1],
    mutationFn: deleteReport,
    onSuccess: () => {
      toast.success("Report successfully deleted.");
    },
    onMutate: async (selectedReport) => {
      await queryClient.cancelQueries({
        queryKey: ["reports", TOTAL_REPORTS_PER_PAGE, currentPage - 1],
      });
      const previousCars = queryClient.getQueryData([
        "reports",
        TOTAL_REPORTS_PER_PAGE,
        currentPage - 1,
      ]);

      queryClient.setQueryData(
        ["reports", TOTAL_REPORTS_PER_PAGE, currentPage - 1],
        (reportsData: PageableResponse<Report[]>) => {
          const filterReports = reportsData.content.filter(
            (report) => report.id !== selectedReport.reportId
          );

          return {
            content: filterReports || [],
            page: reportsData.page || {},
          };
        }
      );

      return { previousCars };
    },
    onError: () => {
      toast.error("Couldn't delete the report. Try again later!");
    },
  });

  const deleteReportModalHandler = () => {
    deleteReportMutation.mutate({ reportId: selectedReportId });
    onCloseDeleteReportModal();
  };

  return (
    <>
      <AnswerReportModal
        currentPage={currentPage}
        pageSize={TOTAL_REPORTS_PER_PAGE}
        modalState={answerReportModal}
        onClose={onCloseAnswerReportModal}
        reportId={selectedReportId}
      />
      <DeleteConfirmationModal
        modalState={deleteReportModal}
        onDelete={deleteReportModalHandler}
        handleOnCloseModal={onCloseDeleteReportModal}
        headerText="Are you sure?"
        bodyText="Are you sure you want to permanently delete this report? This action cannot be undone."
      />
      <section>
        <h3 className="font-semibold text-2xl ml-2">Reports</h3>
        {isLoading && (
          <div className="ml-4 mt-4">
            <Spinner md />
          </div>
        )}
        {data && data.content && data.content.length < 1 && (
          <p className="ml-2 mt-2">No reports added yet.</p>
        )}
        {isError && <p>Couldn't fetch reports.</p>}
        {data && data.content && data.content.length > 0 && (
          <AdminReportsList
            reports={data.content}
            onOpenAnswerReportModal={onOpenAnswerReportModal}
            onOpenDeleteReportModal={onOpenDeleteReportModal}
          />
        )}

        {data && data.page && (
          <Pagination
            currentPage={currentPage}
            handleCurrentPage={handleCurrentPage}
            totalPages={data.page.totalPages}
          />
        )}
      </section>
    </>
  );
}

export default AdminReports;
