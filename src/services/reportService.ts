import apiClient from ".";
import { Report } from "@/types/Report";
import { ReportForm } from "@/validations/reportValidationSchemas";

export const createReport = async (createReportData: ReportForm) => {
  const response = await apiClient.post(`/reports`, createReportData);
  return response.data;
};

export const getLoggedInUserReports = async (): Promise<Report[]> => {
  const response = await apiClient.get("/reports/me");
  return response.data;
};
