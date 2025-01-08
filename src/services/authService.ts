import {
  LoginUser,
  RegisterUser,
  ResetPassword,
  ResetPasswordConfirm,
} from "@/types/Auth";
import apiClient from "./index";

export const signin = async (loginFormData: LoginUser) => {
  const response = await apiClient.post("/auth/authenticate", loginFormData);
  return response.data;
};

export const signup = async (
  registerFormData: RegisterUser
): Promise<RegisterUser> => {
  const response = await apiClient.post("/auth/register", registerFormData);
  return response.data;
};

export const verifyEmail = async (token: string) => {
  const response = await apiClient.get(
    `/auth/register/confirm-email?token=${token}`
  );
  return response.data;
};

export const logout = async () => {
  const response = await apiClient.post("/auth/logout");
  return response.data;
};

export const resetPassword = async (resetPasswordData: ResetPassword) => {
  const response = await apiClient.post(
    "/auth/request-password-reset",
    resetPasswordData
  );
  return response.data;
};

export const confirmResetPassword = async (
  resetPasswordConfirmData: ResetPasswordConfirm
) => {
  const response = await apiClient.post(
    "/auth/reset-password",
    resetPasswordConfirmData
  );
  return response.data;
};
