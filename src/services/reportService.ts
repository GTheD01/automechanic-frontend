import apiClient from ".";
import { ReportForm } from "@/validations/reportValidationSchemas";

export const createReport = async (createReportData: ReportForm) => {
  const response = await apiClient.post(`/reports`, createReportData);
  return response.data;
};
