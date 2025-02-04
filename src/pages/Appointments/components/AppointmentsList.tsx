import React from "react";

import Spinner from "@/components/Spinner";
import { Appointment } from "@/types/Appointment";
import AppointmentCard from "@/pages/Appointments/components/AppointmentCard";

interface AppointmentsListProps {
  appointments: Appointment[];
  isLoading: boolean;
  isError: boolean;
  carPage?: boolean;
}

const AppointmentsList = React.memo(
  ({ appointments, isError, isLoading, carPage }: AppointmentsListProps) => {
    if (isLoading) {
      return <Spinner lg />;
    }

    if (isError || !appointments) {
      return (
        <p className="pl-2 pt-2">
          There was an error fetching your appointments. Please try again later.
        </p>
      );
    }
    return (
      <ul>
        {appointments?.map((appointment) => (
          <AppointmentCard
            key={appointment.id}
            appointment={appointment}
            carPage={carPage}
          />
        ))}
      </ul>
    );
  }
);

export default AppointmentsList;
