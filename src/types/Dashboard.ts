import { Appointment } from "@/types/Appointment";

export interface AdminDashboardResponse {
  totalAppointments: number;
  totalCars: number;
  totalReports: number;
  upcomingAppointment: Appointment;
}

export interface UserDashboardResponse {
  totalUserAppointments: number;
  totalUserCars: number;
  totalUserReports: number;
  upcomingUserAppointment: Appointment;
}
