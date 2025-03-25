import { z } from "zod";

export const CreateReportSchema = z.object({
  reportType: z
    .string()
    .nonempty({ message: "Report type is required" })
    .refine((val) => val !== "Select", {
      message: "Please select a valid report type",
    }),
  description: z.string().min(1, "Description must be at least 1 character"),
});

export const AnswerReportSchema = z.object({
  answer: z.string().min(1, "Answer must be at least 1 character"),
});

export type CreateReportForm = z.infer<typeof CreateReportSchema>;
export type AnswerReportForm = z.infer<typeof AnswerReportSchema>;
