import { Report } from "@/types/Report";
import Button from "@/components/Button";

function AdminReportCard({
  report,
  onOpenAnswerReportModal,
}: {
  report: Report;
  onOpenAnswerReportModal: () => void;
}) {
  return (
    <li className="px-4 pt-4 border-b flex justify-between items-center">
      <div>
        <div className="flex gap-12">
          <div>
            <p className="font-semibold">Created at:</p>
            <span>{report?.createdAt}</span>
          </div>
          <div>
            <p className="font-semibold">Created by:</p>
            <span>
              {report?.user?.firstName} {report?.user?.lastName}
            </span>
          </div>
        </div>
        <div>
          <p className="font-semibold">Description:</p>
          <span>{report?.description}</span>
        </div>
        <div>
          <p className="font-semibold">Answer:</p>
          <span>{report?.answer ?? "Not answered yet."}</span>
        </div>
      </div>
      <div className="flex flex-col gap-2">
        {report?.answer === null && (
          <Button
            className="py-2 px-4 rounded-3xl"
            onClick={onOpenAnswerReportModal}
          >
            Answer
          </Button>
        )}
        <button className="bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded-3xl">
          Delete
        </button>
      </div>
    </li>
  );
}

export default AdminReportCard;
