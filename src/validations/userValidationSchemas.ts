import { z } from "zod";

const PHONE_NUMBER_REGEX = /^07[0-9]\s[0-9]{3}\s[0-9]{2}\s[0-9]{2}$/;

export const UpdateUserProfileSchema = z.object({
  firstName: z.string().min(1, "First name must be at least 1 character"),
  lastName: z.string().min(1, "Password must be at least 1 character"),
  phoneNumber: z
    .string()
    .regex(PHONE_NUMBER_REGEX, { message: "Invalid phone number." }),
});
