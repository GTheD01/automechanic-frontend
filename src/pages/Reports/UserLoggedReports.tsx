import { useState } from "react";
import { useQuery } from "@tanstack/react-query";

import Button from "@/components/Button";
import Spinner from "@/components/Spinner";
import UserReportsList from "./components/UserReportsList";
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
      {userReports && <UserReportsList reports={userReports} />}
    </section>
  );
}

export default UserReports;
