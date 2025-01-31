import { useCallback, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";

import { Pagination } from "@/components/Pagination";
import { getUserAppointments } from "@/services/appointmentService";
import AppointmentsList from "../Appointments/components/AppointmentsList";

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
      <AppointmentsList
        appointments={data?.content}
        isError={isError}
        isLoading={isLoading}
      />
      <Pagination
        currentPage={currentPage}
        handleCurrentPage={handleCurrentPage}
        totalPages={data?.page?.totalPages}
      />
    </>
  );
}

export default UserAppointments;
