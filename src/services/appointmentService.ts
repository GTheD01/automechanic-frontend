import { AppointmentFilters, AppointmentRequest } from "@/types/Appointment";
import apiClient from ".";

export const fetchAllAppointments = async ({
  queryKey,
  signal,
}: {
  queryKey: [string, AppointmentFilters, string];
  signal: AbortSignal;
}) => {
  const [, appointmentFilters, size] = queryKey;
  const params = new URLSearchParams(
    appointmentFilters as Record<string, string>
  );
  const response = await apiClient.get(
    `/appointments/admin?size=${size}&${params}`,
    {
      signal,
    }
  );
  return response.data;
};

export const createAppointment = async (
  appointmentData: AppointmentRequest
) => {
  const response = await apiClient.post(`/appointments`, appointmentData);
  return response.data;
};
