enum UserRoles {
  ADMIN = "admin",
  USER = "user",
}

export interface User {
  firstName: string;
  lastName: string;
  email: string;
  role: UserRoles | undefined;
}
