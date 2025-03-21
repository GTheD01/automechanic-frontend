import { z } from "zod";

const PHONE_NUMBER_REGEX = /^07[0-9]\s[0-9]{3}\s[0-9]{2}\s[0-9]{2}$/;

export const UpdateUserProfileSchema = z.object({
  firstName: z.string().optional().default(""),
  lastName: z.string().optional().default(""),
  phoneNumber: z
    .string()
    .refine((val) => val === "" || PHONE_NUMBER_REGEX.test(val), {
      message: "Invalid phone number.",
    })
    .optional()
    .default(""),
});
