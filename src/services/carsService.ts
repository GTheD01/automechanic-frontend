import apiClient from "@/services";
import { User } from "@/types/User";
import { Car, CarBrand, CarDataProps, CarModel } from "@/types/Car";
import { Appointment } from "@/types/Appointment";

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

export const getCar = async ({
  queryKey,
}: {
  queryKey: [string, Car["id"] | undefined];
}): Promise<Car & { appointments: Appointment[] }> => {
  const [_, carId] = queryKey;
  const response = await apiClient.get(`/cars/${carId}`);
  return response.data;
};
