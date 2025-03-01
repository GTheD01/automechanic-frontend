import {
  Appointment,
  AppointmentFilters,
  AppointmentUpdateRequest,
} from "@/types/Appointment";
import apiClient from "@/services";
import { User } from "@/types/User";
import { PageableResponse } from "@/types/GlobalTypes";
import { AppointmentForm } from "@/pages/Appointments/components/CreateAppointmentModal";

export const fetchAllAppointments = async ({
  queryKey,
  signal,
}: {
  queryKey: [string, AppointmentFilters, string];
  signal: AbortSignal;
}): Promise<PageableResponse<Appointment>> => {
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

export const createAppointment = async (appointmentData: AppointmentForm) => {
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
  queryKey: [string, User["id"] | undefined, string, number];
}) => {
  const [_, userId, size, page] = queryKey;
  const response = await apiClient.get(
    `admin/appointments/${userId}?size=${size}&page=${page}`
  );
  return response.data;
};

export const getLoggedInUserAppointments = async ({
  queryKey,
  signal,
}: {
  queryKey: [string, string, number];
  signal: AbortSignal;
}) => {
  const [, size, page] = queryKey;
  const response = await apiClient.get(
    `appointments/me?size=${size}&page=${page}`,
    {
      signal,
    }
  );
  return response.data;
};
