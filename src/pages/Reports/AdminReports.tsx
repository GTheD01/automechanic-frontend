import { toast } from "react-toastify";
import { useCallback, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import { Report } from "@/types/Report";
import Spinner from "@/components/Spinner";
import { deleteReport, getAllReports } from "@/services/reportService";
import AdminReportsList from "@/pages/Reports/components/AdminReportsList";
import DeleteConfirmationModal from "@/components/DeleteConfirmationModal";
import AnswerReportModal from "@/pages/Reports/components/AnswerReportModal";

function AdminReports() {
  const {
    data: reports,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["reports"],
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

  const queryClient = useQueryClient();

  const deleteReportMutation = useMutation({
    mutationKey: ["reports"],
    mutationFn: deleteReport,
    onSuccess: () => {
      toast.success("Report successfully deleted.");
    },
    onMutate: async (selectedReport) => {
      await queryClient.cancelQueries({ queryKey: ["reports"] });
      const previousCars = queryClient.getQueryData(["reports"]);

      queryClient.setQueryData(["reports"], (oldReports: Report[]) =>
        oldReports.filter((report) => report.id !== selectedReport.reportId)
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
        {reports && reports.length < 1 && (
          <p className="ml-2 mt-2">No reports added yet.</p>
        )}
        {isError && <p>Couldn't fetch reports.</p>}
        {reports && reports.length > 0 && (
          <AdminReportsList
            reports={reports}
            onOpenAnswerReportModal={onOpenAnswerReportModal}
            onOpenDeleteReportModal={onOpenDeleteReportModal}
          />
        )}
      </section>
    </>
  );
}

export default AdminReports;
