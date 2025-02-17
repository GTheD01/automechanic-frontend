import { useQuery } from "@tanstack/react-query";

import Spinner from "@/components/Spinner";
import { getAllReports } from "@/services/reportService";
import Button from "@/components/Button";

function AdminReports() {
  const {
    data: reports,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["reports"],
    queryFn: getAllReports,
  });
  return (
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
            <li
              key={report.id}
              className="px-4 pt-4 border-b flex justify-between items-center"
            >
              <div>
                <div className="flex gap-12">
                  <div>
                    <p className="font-semibold">Created at:</p>
                    <span>{report.createdAt}</span>
                  </div>
                  <div>
                    <p className="font-semibold">Created by:</p>
                    <span>
                      {report.user.firstName} {report.user.lastName}
                    </span>
                  </div>
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
              <div className="flex flex-col gap-2">
                {report.answer === null && (
                  <Button className="py-2 px-4 rounded-3xl">Answer</Button>
                )}
                <button className="bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded-3xl">
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}

export default AdminReports;
