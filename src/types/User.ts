type UserRoles = "ADMIN" | "USER";

export interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  userRole: UserRoles;
  avatar: string;
  phoneNumber: string;
  carsCount: number;
  appointmentCount: number;
  enabled: boolean;
}

export interface UserFilters {
  name?: string;
  hasCars?: boolean;
  hasAppointments?: boolean;
  enabled?: boolean;
  page?: number;
}
