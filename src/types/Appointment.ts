import { User } from "@/types/User";
import { Car } from "./Car";

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
  createdDate: string;
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
