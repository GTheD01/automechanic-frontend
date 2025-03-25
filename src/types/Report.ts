import { User } from "@/types/User";

export type ReportType = "APPOINTMENT" | "WEBSITE" | "OTHER";

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
