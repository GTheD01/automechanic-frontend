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

export const deleteUserAccountById = async (userId: User["id"]) => {
  const response = await apiClient.delete(`/admin/users/${userId}`);
  return response.data;
};

export const getAllUsers = async ({
  userFilters,
  size,
}: {
  userFilters: UserFilters;
  size: string;
}): Promise<PageableResponse<User[]>> => {
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

export const updateLoggedInUserProfile = async ({
  updateProfileUserData,
}: {
  updateProfileUserData: Partial<User>;
}) => {
  const response = await apiClient.put("/users/me", updateProfileUserData);
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
