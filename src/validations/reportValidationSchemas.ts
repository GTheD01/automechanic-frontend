import { z } from "zod";

export const CreateReportSchema = z.object({
  description: z.string().min(1, "Description must be at least 1 character"),
});

export type ReportForm = z.infer<typeof CreateReportSchema>;
