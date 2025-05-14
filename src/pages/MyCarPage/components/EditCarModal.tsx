import { z } from "zod";
import { AxiosError } from "axios";
import { toast } from "react-toastify";
import { ChangeEvent, useEffect, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import Modal from "@/components/common/Modal";
import CarForm from "@/components/CarForm";
import { Car, CarDataProps } from "@/types/Car";
import { ApiResponseError } from "@/types/Auth";
import { AddCarSchema } from "@/validations/carValidationSchemas";
import { editCar, getBrandModels, getCarBrands } from "@/services/carService";

const initialErrors: CarDataProps = {
  brandName: "",
  modelName: "",
  year: "",
  version: "",
};

function EditCarModal({
  open,
  onClose,
  car,
}: {
  open: boolean;
  onClose: () => void;
  car: Partial<Car> | undefined;
}) {
  const [carData, setCarData] = useState<CarDataProps>({
    brandName: "",
    modelName: "",
    version: "",
    year: "",
  });

  useEffect(() => {
    setCarData({
      brandName: car?.carBrand?.name || "",
      modelName: car?.model?.name || "",
      version: car?.version || "",
      year: car?.year?.toString() || "",
    });
  }, [car]);

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

  const queryClient = useQueryClient();

  const editCarMutation = useMutation({
    mutationKey: ["userCar"],
    mutationFn: editCar,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["userCar"] });
      queryClient.invalidateQueries({ queryKey: ["userCars"] });
      queryClient.invalidateQueries({ queryKey: ["appointments"] });

      setCarData(carData);
      toast.success("Successfully edited.");
      onClose();
    },
    onError: (error: AxiosError) => {
      const data = error?.response?.data as ApiResponseError;
      toast.error(data.message);
    },
  });

  const editCarHandler = (e: ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();

    setErrors(initialErrors);
    try {
      AddCarSchema.parse(carData);
      editCarMutation.mutate({ carId: car?.id, carData });
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

  const handleOnChange = (
    e: ChangeEvent<HTMLSelectElement | HTMLInputElement>
  ) => {
    const { name, value } = e.target;
    setCarData((prevData) => ({ ...prevData, [name]: value }));
  };

  const onCloseAddCarModalHandler = () => {
    onClose();
    setErrors(initialErrors);
  };

  return (
    <Modal open={open} onClose={onCloseAddCarModalHandler}>
      <h3 className="font-semibold text-center text-2xl mb-6">Add car</h3>

      <CarForm
        carActionHandler={editCarHandler}
        brandModels={brandModels || []}
        carBrands={carBrands || []}
        carData={carData}
        errors={errors}
        handleOnChange={handleOnChange}
        isPending={editCarMutation.isPending}
        onModalClose={onClose}
      />
    </Modal>
  );
}

export default EditCarModal;
