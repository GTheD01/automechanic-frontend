import apiClient from "@/services";
import {
  AdminDashboardResponse,
  UserDashboardResponse,
} from "@/types/Dashboard";

export const getAdminDashboard = async (): Promise<AdminDashboardResponse> => {
  const response = await apiClient.get("admin/dashboard");
  return response.data;
};

export const getUserDashboard = async (): Promise<UserDashboardResponse> => {
  const response = await apiClient.get("/dashboard");
  return response.data;
};
