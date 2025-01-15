import { AppointmentFilters } from "@/types/Appointment";
import apiClient from ".";

export const fetchAllAppointments = async ({
  queryKey,
  signal,
}: {
  queryKey: [string, AppointmentFilters];
  signal: AbortSignal;
}) => {
  const [, appointmentFilters] = queryKey;
  const params = new URLSearchParams(
    appointmentFilters as Record<string, string>
  );
  const response = await apiClient.get(`/appointments/admin?size=2&${params}`, {
    signal,
  });
  return response.data;
};
