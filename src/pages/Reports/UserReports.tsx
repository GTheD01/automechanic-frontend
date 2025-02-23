import { useState } from "react";
import { useQuery } from "@tanstack/react-query";

import Button from "@/components/Button";
import Spinner from "@/components/Spinner";
import { getLoggedInUserReports } from "@/services/reportService";
import CreateReportModal from "@/pages/Reports/components/CreateReportModal";

function UserReports() {
  const [createReportModal, setCreateReportModal] = useState<boolean>(false);

  const { data: userReports, isLoading } = useQuery({
    queryKey: ["reports"],
    queryFn: getLoggedInUserReports,
  });

  const onCloseCreateReportModal = () => {
    setCreateReportModal(false);
  };

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
      {userReports && userReports.length < 1 && (
        <p className="ml-2 mt-2">No reports found.</p>
      )}
      {userReports && (
        <ul>
          {userReports.map((report) => (
            <li key={report.id} className="px-4 pt-4 border-b">
              <div>
                <div>
                  <p className="font-semibold">Created at:</p>
                  <span>{report.createdAt}</span>
                </div>
                <div>
                  <p className="font-semibold">Description:</p>
                  <span>{report.description}</span>
                </div>
                <div>
                  <p className="font-semibold">Answer:</p>
                  <span>{report.answer ?? "Not answered yet."}</span>
                </div>
              </div>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}

export default UserReports;
