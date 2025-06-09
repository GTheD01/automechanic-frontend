import { User } from "@/types/User";

export const reportTypeList = ["APPOINTMENT", "WEBSITE", "OTHER"] as const;

export type ReportType = (typeof reportTypeList)[number];

export interface Report {
  id: string;
  createdAt: string;
  description: string;
  answer: string;
  reportType: ReportType;
  user: User;
}

export interface AnswerReportData {
  answer: string;
}
