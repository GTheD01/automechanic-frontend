import { Appointment } from "@/types/Appointment";

export interface AdminDashboardResponse {
  totalAppointments: number;
  totalCars: number;
  totalReports: number;
  upcomingAppointment: Appointment;
}
