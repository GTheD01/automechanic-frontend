import apiClient from "@/services";
import { User } from "@/types/User";
import { Appointment } from "@/types/Appointment";
import { PageableResponse } from "@/types/GlobalTypes";
import { Car, CarBrand, CarDataProps, CarModel } from "@/types/Car";
import { AddCarBrandType } from "@/validations/carValidationSchemas";

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

export const deleteCarBrand = async (brandName: CarBrand["name"]) => {
  const response = await apiClient.delete(`/admin/brands/${brandName}`);
  return response.data;
};

export const getAdminCarBrands = async ({
  queryKey,
}: {
  queryKey: [string, number, number];
}): Promise<PageableResponse<CarBrand[]>> => {
  const [, size, page] = queryKey;
  const response = await apiClient.get(
    `/admin/brands?size=${size}&page=${page}`
  );
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

export const deleteCar = async (carId: Car["id"] | undefined) => {
  const response = await apiClient.delete(`/cars/${carId}`);
  return response.data;
};

export const editCar = async ({
  carId,
  carData,
}: {
  carId: Car["id"] | undefined;
  carData: CarDataProps;
}) => {
  const response = await apiClient.put(`/cars/${carId}`, carData);
  return response.data;
};

export const addCarBrand = async (brandForm: AddCarBrandType) => {
  const response = await apiClient.post("/admin/brands", brandForm);
  return response.data;
};
