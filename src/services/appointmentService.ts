import apiClient from ".";

export const fetchAllAppointments = async () => {
  const response = await apiClient.get("/appointments/admin");
  return response.data;
};
