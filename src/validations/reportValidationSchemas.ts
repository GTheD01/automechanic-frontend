import { z } from "zod";

export const CreateReportSchema = z.object({
  description: z.string().min(1, "Description must be at least 1 character"),
});

export const AnswerReportSchema = z.object({
  answer: z.string().min(1, "Answer must be at least 1 character"),
});

export type CreateReportForm = z.infer<typeof CreateReportSchema>;
export type AnswerReportForm = z.infer<typeof AnswerReportSchema>;
