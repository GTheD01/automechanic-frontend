import { Car, CarBrand, CarDataProps, CarModel } from "@/types/Car";
import { User } from "@/types/User";
import apiClient from ".";

export const getUserCars = async ({
  queryKey,
}: {
  queryKey: [string, User["id"] | undefined];
}): Promise<Car[]> => {
  const [_, userId] = queryKey;
  const response = await apiClient.get(`admin/cars/user/${userId}`);
  return response.data;
};

export const getLoggedInUserCars = async (): Promise<Car[]> => {
  const response = await apiClient.get("cars");
  return response.data;
};

export const getCarBrands = async (): Promise<CarBrand[]> => {
  const response = await apiClient.get("brands");
  return response.data;
};

export const getBrandModels = async ({
  queryKey,
}: {
  queryKey: [string, CarBrand["name"]];
}): Promise<CarModel[]> => {
  const [_, brand] = queryKey;
  const response = await apiClient.get(`${brand}/models`);
  return response.data;
};

export const addCar = async (carData: CarDataProps) => {
  const response = await apiClient.post("/cars", carData);
  return response.data;
};
