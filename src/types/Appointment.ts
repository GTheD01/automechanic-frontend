import { User } from "@/types/User";

export enum AppointmentStatus {
  UPCOMING = "UPCOMING",
  FINISHED = "FINISHED",
  CANCELLED = "CANCELLED",
  RESCHEDULED = "RESCHEDULED",
}

export interface Appointment {
  id: string;
  description: string;
  appointmentDate: string;
  appointmentTime: string;
  appointmentStatus: AppointmentStatus;
  user: User;
  createdDate: string;
  lastModifiedDate: string;
}

export interface AppointmentRequest {
  description: string;
  appointmentDate: string;
  appointmentTime: string;
}

export interface AppointmentUpdateRequest {
  appointmentStatus: AppointmentStatus;
}

export interface AppointmentFilters {
  search?: string;
  page?: number;
}
