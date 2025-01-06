export interface RegisterUser {
  email: string;
  password: string;
  repeatPassword: string;
  firstName: string;
  lastName: string;
}

export interface LoginUser {
  email: string;
  password: string;
}

export interface LoginResponseError {
  message: string;
  error: string;
  status: number;
}
