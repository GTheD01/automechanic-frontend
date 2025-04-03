import apiClient from "@/services";
import {
  SignInUser,
  SignUpUser,
  ResetPassword,
  ResetPasswordConfirm,
} from "@/types/Auth";

export const signin = async (signinFormData: SignInUser) => {
  const response = await apiClient.post("/auth/authenticate", signinFormData);
  return response.data;
};

export const signup = async (
  signupFormData: SignUpUser
): Promise<SignUpUser> => {
  const response = await apiClient.post("/auth/signup", signupFormData);
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

export const verifyToken = async () => {
  const response = await apiClient.post("/auth/jwt/verify-token");
  return response.data;
};
