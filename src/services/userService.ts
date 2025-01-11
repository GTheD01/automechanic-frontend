import { User, UserFilters } from "@/types/User";
import apiClient from ".";

export const fetchUser = async (): Promise<User> => {
  const response = await apiClient.get("/users/me");
  return response.data;
};

export const fetchAllUsers = async ({
  queryKey,
  signal,
}: {
  queryKey: [string, UserFilters];
  signal: AbortSignal;
}) => {
  const [, userFilters] = queryKey;
  const params = new URLSearchParams(userFilters as Record<string, string>);
  const response = await apiClient.get(`/admin/users?size=4&${params}`, {
    signal,
  });
  return response.data;
};
