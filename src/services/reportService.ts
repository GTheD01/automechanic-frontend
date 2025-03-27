import apiClient from "@/services";
import { User } from "@/types/User";
import { PageableResponse } from "@/types/GlobalTypes";
import { AnswerReportData, Report } from "@/types/Report";
import { CreateReportForm } from "@/validations/reportValidationSchemas";

export const createReport = async (createReportData: CreateReportForm) => {
  const response = await apiClient.post(`/reports`, createReportData);
  return response.data;
};

export const getLoggedInUserReports = async ({
  queryKey,
}: {
  queryKey: [string, string, number];
}): Promise<PageableResponse<Report[]>> => {
  const [_, size, page] = queryKey;
  const response = await apiClient.get(`/reports/me?size=${size}&page=${page}`);
  return response.data;
};

export const getUserReports = async ({
  queryKey,
}: {
  queryKey: [string, string, number, User["id"] | undefined];
}): Promise<PageableResponse<Report[]>> => {
  const [_, size, page, userId] = queryKey;
  const response = await apiClient.get(
    `admin/reports/user/${userId}?size=${size}&page=${page}`
  );
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
