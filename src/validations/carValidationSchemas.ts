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

export const AddCarBrandSchema = z.object({
  brandName: z.string().nonempty({ message: "Brand name is required" }),
});

export const AddCarModelSchema = z.object({
  brandName: z
    .string()
    .nonempty({ message: "Brand is required" })
    .refine((val) => val !== "Select Brand", {
      message: "Please select a valid brand",
    }),
  modelName: z.string().nonempty({ message: "Model name is required" }),
});

export type AddCarBrandType = z.infer<typeof AddCarBrandSchema>;
export type AddCarModelType = z.infer<typeof AddCarModelSchema>;
