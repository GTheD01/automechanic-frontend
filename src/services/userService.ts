import { User } from "@/types/User";
import apiClient from ".";

export const fetchUser = async (): Promise<User> => {
  const response = await apiClient.get("/users/me");
  return response.data;
};
