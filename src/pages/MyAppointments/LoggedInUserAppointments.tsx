import { useCallback, useState } from "react";
import { useQuery } from "@tanstack/react-query";

import { Pagination } from "@/components/Pagination";
import AppointmentsList from "../Appointments/components/AppointmentsList";
import { getLoggedInUserAppointments } from "@/services/appointmentService";
import CreateAppointmentModal from "../Appointments/components/CreateAppointmentModal";

function LoggedInUserAppointments() {
  // TODO: Implement search filter?
  const [currentPage, setCurrentPage] = useState(1);
  const [createAppointmentModal, setCreateAppointmentModal] =
    useState<boolean>(false);

  const { data, isError, isLoading } = useQuery({
    queryKey: ["appointments", "3", currentPage - 1],
    queryFn: getLoggedInUserAppointments,
    staleTime: 1000 * 60 * 10,
  });

  const handleCurrentPage = useCallback(
    (el: number) => {
      setCurrentPage(el);
    },
    [currentPage]
  );

  return (
    <main>
      {createAppointmentModal && (
        <CreateAppointmentModal
          appointments={data?.content}
          modalStateHandler={setCreateAppointmentModal}
        />
      )}

      <button
        onClick={() => setCreateAppointmentModal(true)}
        className="mx-2 bg-secondary text-white rounded-3xl py-2 px-4 sm:px-6 hover:bg-secondaryHover mb-2 text-sm lg:text-base"
      >
        Create appointment
      </button>

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
    </main>
  );
}

export default LoggedInUserAppointments;
