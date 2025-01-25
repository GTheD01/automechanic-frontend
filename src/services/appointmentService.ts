import apiClient from "@/services";
import {
  Appointment,
  AppointmentFilters,
  AppointmentRequest,
  AppointmentUpdateRequest,
} from "@/types/Appointment";
import { User } from "@/types/User";

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
    `admin/appointments?size=${size}&${params}`,
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

export const updateAppointment = async ({
  appointmentId,
  appointmentUpdateRequest,
}: {
  appointmentId: Appointment["id"];
  appointmentUpdateRequest: AppointmentUpdateRequest;
}): Promise<any> => {
  const response = await apiClient.patch(
    `/admin/appointments/${appointmentId}`,
    appointmentUpdateRequest
  );

  return response.data;
};

export const getUserAppointments = async ({
  queryKey,
}: {
  queryKey: [string, User["id"] | undefined];
}) => {
  const [_, userId] = queryKey;
  const response = await apiClient.get(`admin/appointments/${userId}`);
  return response.data;
};
