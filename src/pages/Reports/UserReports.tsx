import Button from "@/components/Button";
import CreateReportModal from "./components/CreateReportModal";
import { useState } from "react";

function UserReports() {
  const [createReportModal, setCreateReportModal] = useState<boolean>(false);

  const onClose = () => {
    setCreateReportModal(false);
  };
  return (
    <div>
      <CreateReportModal modalState={createReportModal} onClose={onClose} />
      <Button
        className="py-2 px-4 rounded-3xl ml-2"
        onClick={() => setCreateReportModal(true)}
      >
        Create report
      </Button>
      <p className="ml-2 mt-2">No reports found.</p>
    </div>
  );
}

export default UserReports;
