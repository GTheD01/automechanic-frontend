import { z } from "zod";

export const CreateAppointmentSchema = z.object({
  carId: z
    .string()
    .nonempty({ message: "Car is required" })
    .refine((val) => val !== "Select", {
      message: "Please select a valid car",
    }),
  appointmentDate: z
    .string()
    .regex(
      /^(0[1-9]|[12][0-9]|3[01])\.(0[1-9]|1[0-2])\.\d{4}$/,
      "Appointment date must be selected"
    ),
  appointmentTime: z
    .string()
    .regex(
      /^([01]?[0-9]|2[0-3]):([0-5][0-9])$/,
      "Appointment time must be selected"
    ),
  description: z.string().min(1, "Description must be at least 1 character"),
});
