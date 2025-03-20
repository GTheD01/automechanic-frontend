import apiClient from "@/services";
import { User, UserFilters } from "@/types/User";
import { PageableResponse } from "@/types/GlobalTypes";

export const getLoggedInUser = async (): Promise<User> => {
  const response = await apiClient.get("/users/me");
  return response.data;
};

export const deleteLoggedInUser = async () => {
  const response = await apiClient.delete("/users/me");
  return response.data;
};

export const getAllUsers = async ({
  queryKey,
}: {
  queryKey: [string, UserFilters, string];
}): Promise<PageableResponse<User[]>> => {
  const [, userFilters, size] = queryKey;
  const params = new URLSearchParams(userFilters as Record<string, string>);
  const response = await apiClient.get(`/admin/users?size=${size}&${params}`);
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
