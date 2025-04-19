import { Appointment } from "@/types/Appointment";

export interface AppointmentsPerYear {
  year: string;
  appointments: number;
}

export interface AdminDashboardResponse {
  totalAppointments: number;
  totalCars: number;
  totalReports: number;
  upcomingAppointment: Appointment;
  appointmentsStatsByYear: AppointmentsPerYear[];
}

export interface UserDashboardResponse {
  totalUserAppointments: number;
  totalUserCars: number;
  totalUserReports: number;
  upcomingUserAppointment: Appointment;
}
