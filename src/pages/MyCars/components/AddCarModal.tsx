import { z } from "zod";
import { AxiosError } from "axios";
import { v4 as uuidv4 } from "uuid";
import { toast } from "react-toastify";
import { ChangeEvent, Dispatch, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import Modal from "@/components/common/Modal";
import CarForm from "@/components/CarForm";
import { ApiResponseError } from "@/types/Auth";
import { Car, CarDataProps } from "@/types/Car";
import { AddCarSchema } from "@/validations/carValidationSchemas";
import { addCar, getBrandModels, getCarBrands } from "@/services/carService";

const initialCarData: CarDataProps = {
  brandName: "",
  modelName: "",
  year: "",
  version: "",
};

const initialErrors: CarDataProps = {
  brandName: "",
  modelName: "",
  year: "",
  version: "",
};

function AddCarModal({
  setCarModalState,
  carModalState,
}: {
  setCarModalState: Dispatch<boolean>;
  carModalState: boolean;
}) {
  const [carData, setCarData] = useState<CarDataProps>(initialCarData);
  const [errors, setErrors] = useState<CarDataProps>(initialErrors);

  const { brandName } = carData;

  const { data: carBrands } = useQuery({
    queryKey: ["carBrands"],
    queryFn: getCarBrands,
    staleTime: 1000 * 60 * 60,
  });

  const { data: brandModels } = useQuery({
    queryKey: ["brandModels", brandName],
    queryFn: getBrandModels,
    enabled: !!brandName,
  });

  const handleOnChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;

    const updatedValue =
      name === "brandName" && value === "Select" ? "" : value;

    setCarData((prevData) => ({ ...prevData, [name]: updatedValue }));
  };

  const queryClient = useQueryClient();

  const addCarMutation = useMutation({
    mutationFn: addCar,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["userCars"] });
      setCarData(initialCarData);
      toast.success("Car added");
      setCarModalState(false);
    },
    onMutate: async (newCar) => {
      await queryClient.cancelQueries({ queryKey: ["userCars"] });

      const previousCars = queryClient.getQueryData(["userCars"]);
      const newCarModified = {
        id: uuidv4(),
        year: newCar.year,
        version: newCar.version,
        carBrand: {
          name: newCar.brandName,
        },
        model: {
          name: newCar.modelName,
        },
      };

      queryClient.setQueryData(["userCars"], (old: Car[]) => [
        ...(old || []),
        newCarModified,
      ]);

      return { previousCars };
    },
    onError: (error: AxiosError, _, context) => {
      queryClient.setQueryData(["userCars"], context?.previousCars);
      const data = error?.response?.data as ApiResponseError;
      toast.error(data.message);
    },
  });

  const addCarHandler = (e: ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();

    setErrors(initialErrors);
    try {
      AddCarSchema.parse(carData);
      addCarMutation.mutate(carData);
    } catch (error) {
      if (error instanceof z.ZodError) {
        const newErrors: Record<string, string> = {};

        for (const issue of error.issues) {
          newErrors[issue.path[0]] = issue.message;
        }

        setErrors((prevErrors) => ({ ...prevErrors, ...newErrors }));
      }
    }
  };

  const onCloseAddCarModalHandler = () => {
    setCarModalState(false);
    setErrors(initialErrors);
  };

  const closeModalHandler = () => {
    setCarModalState(false);
  };

  return (
    <Modal open={carModalState} onClose={onCloseAddCarModalHandler}>
      <h3 className="font-semibold text-center text-2xl mb-6">Add car</h3>
      <CarForm
        handleOnChange={handleOnChange}
        carActionHandler={addCarHandler}
        brandModels={brandModels || []}
        carBrands={carBrands || []}
        carData={carData}
        errors={errors}
        isPending={addCarMutation.isPending}
        onModalClose={closeModalHandler}
      />
    </Modal>
  );
}

export default AddCarModal;
