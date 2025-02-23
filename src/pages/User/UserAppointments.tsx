import { useParams } from "react-router-dom";
import { useCallback, useState } from "react";
import { useQuery } from "@tanstack/react-query";

import Spinner from "@/components/Spinner";
import { Pagination } from "@/components/Pagination";
import { getUserAppointments } from "@/services/appointmentService";
import AppointmentsList from "@/pages/Appointments/components/AppointmentsList";

function UserAppointments() {
  const { userId } = useParams();
  const [currentPage, setCurrentPage] = useState(1);

  const { data, isLoading, isError } = useQuery({
    queryKey: ["userAppointments", userId, "2", currentPage - 1],
    queryFn: getUserAppointments,
  });

  const handleCurrentPage = useCallback(
    (el: number) => {
      setCurrentPage(el);
    },
    [currentPage]
  );

  return (
    <>
      {isLoading && <Spinner lg />}
      {data && data.content && data.content.length < 1 && (
        <p className="pl-2 pt-2">User has no appointments.</p>
      )}
      {isError && (
        <p className="pl-2 pt-2">
          There was an error fetching your appointments. Please try again later.
        </p>
      )}
      {data && data.content && <AppointmentsList appointments={data.content} />}
      {data && data.page && (
        <Pagination
          currentPage={currentPage}
          handleCurrentPage={handleCurrentPage}
          totalPages={data.page.totalPages}
        />
      )}
    </>
  );
}

export default UserAppointments;
