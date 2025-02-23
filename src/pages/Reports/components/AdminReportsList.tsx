import React from "react";

import { Report } from "@/types/Report";
import AdminReportCard from "@/pages/Reports/components/AdminReportCard";

const AdminReportsList = React.memo(
  ({
    reports,
    onOpenAnswerReportModal,
    onOpenDeleteReportModal,
  }: {
    reports: Report[] | undefined;
    onOpenAnswerReportModal: (reportId: string) => void;
    onOpenDeleteReportModal: (reportId: string) => void;
  }) => {
    return (
      <ul>
        {reports?.map((report) => (
          <AdminReportCard
            key={report.id}
            report={report}
            onOpenAnswerReportModal={() => onOpenAnswerReportModal(report.id)}
            onOpenDeleteReportModal={() => onOpenDeleteReportModal(report.id)}
          />
        ))}
      </ul>
    );
  }
);

export default AdminReportsList;
