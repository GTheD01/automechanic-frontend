import { getUserAppointments } from "@/services/appointmentService";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import AppointmentsList from "./Appointments/components/AppointmentsList";

function UserAppointments() {
  const { userId } = useParams();

  //   TODO: Add pagination
  const {
    data: userAppointments,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["userAppointments", userId],
    queryFn: getUserAppointments,
  });

  if (userAppointments?.length < 1) {
    return <p className="ml-2 mt-2">The user has no appointments added.</p>;
  }

  return (
    <AppointmentsList
      appointments={userAppointments}
      isError={isError}
      isLoading={isLoading}
    />
  );
}

export default UserAppointments;
