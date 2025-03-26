import { Report } from "@/types/Report";

function UserReportsList({ reports }: { reports: Report[] }) {
  return (
    <ul>
      {reports.map((report) => (
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
            <div>
              <p className="font-semibold">Report Type:</p>
              <span>{report.reportType}</span>
            </div>
          </div>
        </li>
      ))}
    </ul>
  );
}

export default UserReportsList;
