import React from "react";

import Spinner from "@/components/Spinner";
import { Appointment } from "@/types/Appointment";
import AppointmentCard from "./AppointmentCard";

interface AppointmentsListProps {
  appointments: Appointment[];
  isLoading: boolean;
  isError: boolean;
}

const AppointmentsList = React.memo(
  ({ appointments, isError, isLoading }: AppointmentsListProps) => {
    if (isLoading) {
      return <Spinner lg />;
    }

    if (isError || !appointments) {
      return (
        <p>
          There was an error fetching your appointments. Please try again later.
        </p>
      );
    }
    return (
      <ul>
        {appointments?.map((appointment) => (
          <AppointmentCard key={appointment.id} appointment={appointment} />
        ))}
      </ul>
    );
  }
);

export default AppointmentsList;
