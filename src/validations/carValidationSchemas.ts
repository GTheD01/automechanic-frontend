import { z } from "zod";

export const AddCarSchema = z.object({
  brandName: z
    .string()
    .nonempty({ message: "Brand is required" })
    .refine((val) => val !== "Select", {
      message: "Please select a valid brand",
    }),
  modelName: z
    .string()
    .nonempty({ message: "Model is required" })
    .refine((val) => val !== "Select", {
      message: "Please select a valid model",
    }),
  year: z
    .string()
    .nonempty({ message: "Year is required" })
    .refine((val) => val !== "Select", {
      message: "Please select a valid year",
    }),
});
