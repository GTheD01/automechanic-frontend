import { Car } from "@/types/Car";
import { User } from "@/types/User";

export type AppointmentStatus =
  | "UPCOMING"
  | "FINISHED"
  | "CANCELLED"
  | "RESCHEDULED";

export interface Appointment {
  id: string;
  description: string;
  appointmentDate: string;
  appointmentTime: string;
  appointmentStatus: AppointmentStatus;
  user: User;
  createdAt: string;
  lastModifiedDate: string;
  car: Car;
}

export interface AppointmentUpdateRequest {
  appointmentStatus: AppointmentStatus;
}

export interface AppointmentFilters {
  search?: string;
  page?: number;
}
