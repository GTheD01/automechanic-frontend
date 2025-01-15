import { User } from "./User";

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

export interface AppointmentFilters {
  name?: string;
  page?: number;
}
