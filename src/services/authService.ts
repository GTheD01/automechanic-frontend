import { RegisterUser } from "@/types/Auth";
import apiClient from "./index";

export const signin = async (email: string, password: string) => {
  const response = await apiClient.post("/login", {
    email,
    password,
  });
  return response.data;
};

export const signup = async ({
  email,
  password,
  repeatPassword,
  firstName,
  lastName,
}: RegisterUser): Promise<RegisterUser> => {
  const response = await apiClient.post("/auth/register", {
    email,
    password,
    repeatPassword,
    firstName,
    lastName,
  });
  return response.data;
};
