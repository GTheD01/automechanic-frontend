import { Appointment } from "@/types/Appointment";

export interface AppointmentsPerYear {
  year: string;
  appointmentsCount: number;
}

export interface ReportsPerYear {
  year: string;
  reportsCount: number;
}

export interface AdminDashboardResponse {
  totalAppointments: number;
  totalCars: number;
  totalReports: number;
  upcomingAppointment: Appointment;
  appointmentsPerYearCount: AppointmentsPerYear[];
  reportsPerYearCount: ReportsPerYear[];
}

export interface UserDashboardResponse {
  totalUserAppointments: number;
  totalUserCars: number;
  totalUserReports: number;
  upcomingUserAppointment: Appointment;
}
