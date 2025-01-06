type UserRoles = "ADMIN" | "USER";

export interface User {
  firstName: string;
  lastName: string;
  email: string;
  role: UserRoles;
}
