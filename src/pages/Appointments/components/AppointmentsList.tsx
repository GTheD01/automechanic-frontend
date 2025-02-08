import React from "react";

import { Appointment } from "@/types/Appointment";
import AppointmentCard from "@/pages/Appointments/components/AppointmentCard";

interface AppointmentsListProps {
  appointments: Appointment[];
  carPage?: boolean;
}

const AppointmentsList = React.memo(
  ({ appointments, carPage }: AppointmentsListProps) => {
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
