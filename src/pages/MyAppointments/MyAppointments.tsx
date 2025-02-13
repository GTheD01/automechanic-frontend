import { useCallback, useState } from "react";
import { useQuery } from "@tanstack/react-query";

import Button from "@/components/Button";
import Spinner from "@/components/Spinner";
import { Pagination } from "@/components/Pagination";
import AppointmentsList from "@/pages/Appointments/components/AppointmentsList";
import { getLoggedInUserAppointments } from "@/services/appointmentService";
import CreateAppointmentModal from "@/pages/Appointments/components/CreateAppointmentModal";

function MyAppointments() {
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

  const onCloseCreateAppointmentHandler = () => {
    setCreateAppointmentModal(false);
  };

  return (
    <section>
      <CreateAppointmentModal
        appointments={data?.content}
        modalState={createAppointmentModal}
        onClose={onCloseCreateAppointmentHandler}
      />

      <Button
        onClick={() => setCreateAppointmentModal(true)}
        className="py-2 px-4 sm-px-6 ml-2 rounded-3xl"
      >
        Create appointment
      </Button>

      {isLoading && <Spinner lg />}
      {data && data.content && data.content.length < 1 && (
        <p className="pl-2 pt-2">No appointments found.</p>
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
    </section>
  );
}

export default MyAppointments;
