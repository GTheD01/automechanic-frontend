import { LoginUser, RegisterUser } from "@/types/Auth";
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
