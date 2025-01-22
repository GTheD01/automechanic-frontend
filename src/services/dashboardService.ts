import apiClient from "@/services";
import { AdminDashboardResponse } from "@/types/Dashboard";

export const getAdminDashboard = async (): Promise<AdminDashboardResponse> => {
  const response = await apiClient.get("admin/dashboard");
  return response.data;
};
