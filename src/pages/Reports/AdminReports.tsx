import { useState } from "react";
import { useQuery } from "@tanstack/react-query";

import Spinner from "@/components/Spinner";
import { getAllReports } from "@/services/reportService";
import AdminReportCard from "./components/AdminReportCard";
import AnswerReportModal from "./components/AnswerReportModal";

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

  const onCloseAnswerReportModal = () => {
    setAnswerReportModal(false);
  };

  const onOpenAnswerReportModal = (reportId: string) => {
    setSelectedReportId(reportId);
    setAnswerReportModal(true);
  };

  return (
    <>
      <AnswerReportModal
        modalState={answerReportModal}
        onClose={onCloseAnswerReportModal}
        reportId={selectedReportId}
      />
      <section>
        <h3 className="font-semibold text-2xl ml-2">Reports</h3>
        {isLoading && (
          <div className="ml-4 mt-4">
            <Spinner md />
          </div>
        )}
        {isError && <p>Couldn't fetch reports.</p>}
        {reports && (
          <ul>
            {reports.map((report) => (
              <AdminReportCard
                key={report.id}
                report={report}
                onOpenAnswerReportModal={() =>
                  onOpenAnswerReportModal(report.id)
                }
              />
            ))}
          </ul>
        )}
      </section>
    </>
  );
}

export default AdminReports;
