export interface SignUpUser {
  email: string;
  password: string;
  repeatPassword: string;
  firstName: string;
  lastName: string;
}

export interface SignInUser {
  email: string;
  password: string;
}

export interface ResetPassword {
  email: string;
}

export interface ResetPasswordConfirm {
  email: string;
  token: string;
  newPassword: string;
  repeatNewPassword: string;
}

export interface ApiResponseError {
  message: string;
  error: string;
  status: number;
  path: string;
  timestamp: number;
}
