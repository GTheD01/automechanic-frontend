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

export interface ApiResponseError {
  message: string;
  error: string;
  status: number;
  path: string;
  timestamp: number;
}
