import { User } from "./User";

export interface Report {
  id: string;
  createdAt: string;
  description: string;
  answer: string;
  user: User;
}

export interface AnswerReportData {
  answer: string;
}
