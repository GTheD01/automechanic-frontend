import apiClient from "@/services";
import { User, UserFilters } from "@/types/User";

export const fetchUser = async (): Promise<User> => {
  const response = await apiClient.get("/users/me");
  return response.data;
};

export const fetchAllUsers = async ({
  queryKey,
  signal,
}: {
  queryKey: [string, UserFilters, string];
  signal: AbortSignal;
}) => {
  const [, userFilters, size] = queryKey;
  const params = new URLSearchParams(userFilters as Record<string, string>);
  const response = await apiClient.get(`/admin/users?size=${size}&${params}`, {
    signal,
  });
  return response.data;
};

export const updateUserProfile = async ({
  userId,
  updateProfileUserData,
}: {
  userId: User["id"];
  updateProfileUserData: Partial<User>;
}) => {
  const response = await apiClient.put(
    `/users/${userId}`,
    updateProfileUserData
  );
  return response.data;
};

export const getUserProfile = async ({
  queryKey,
}: {
  queryKey: [string, User["id"] | undefined];
}): Promise<User> => {
  const [_, userId] = queryKey;
  const response = await apiClient.get(`admin/users/${userId}`);
  return response.data;
};
