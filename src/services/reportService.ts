import apiClient from ".";
import { AnswerReportData, Report } from "@/types/Report";
import { User } from "@/types/User";
import { CreateReportForm } from "@/validations/reportValidationSchemas";

export const createReport = async (createReportData: CreateReportForm) => {
  const response = await apiClient.post(`/reports`, createReportData);
  return response.data;
};

export const getLoggedInUserReports = async (): Promise<Report[]> => {
  const response = await apiClient.get("/reports/me");
  return response.data;
};

export const getUserReports = async (
  userId: User["id"] | undefined
): Promise<Report[]> => {
  const response = await apiClient.get(`admin/reports/user/${userId}`);
  return response.data;
};

export const getAllReports = async (): Promise<Report[]> => {
  const response = await apiClient.get("/admin/reports");
  return response.data;
};

export const answerReport = async ({
  reportId,
  answerReportFormData,
}: {
  reportId: string;
  answerReportFormData: AnswerReportData;
}) => {
  const response = await apiClient.put(
    `/admin/reports/${reportId}`,
    answerReportFormData
  );
  return response.data;
};

export const deleteReport = async ({ reportId }: { reportId: string }) => {
  const response = await apiClient.delete(`/admin/reports/${reportId}`);
  return response.data;
};
