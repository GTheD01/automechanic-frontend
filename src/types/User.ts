type UserRoles = "ADMIN" | "USER";

export interface User {
  firstName: string;
  lastName: string;
  email: string;
  userRole: UserRoles;
}
