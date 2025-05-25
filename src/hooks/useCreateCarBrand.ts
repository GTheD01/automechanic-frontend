import { z } from "zod";
import { AxiosError } from "axios";
import { toast } from "react-toastify";
import { ChangeEvent, useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import {
  AddCarBrandSchema,
  AddCarBrandType,
} from "@/validations/carValidationSchemas";
import { ApiResponseError } from "@/types/Auth";
import { addCarBrand } from "@/services/carService";

const useCreateCarBrand = ({ onCloseModal }: { onCloseModal: () => void }) => {
  const [brandName, setBrandName] = useState<AddCarBrandType["brandName"]>("");
  const [errors, setErrors] = useState<Record<string, string>>({});

  const onCloseModalHandler = () => {
    setBrandName("");
    setErrors({});
    onCloseModal();
  };

  const queryClient = useQueryClient();

  const addCarBrandMutation = useMutation({
    mutationKey: ["addCarBrand"],
    mutationFn: addCarBrand,
    onSuccess: () => {
      onCloseModalHandler();
      toast.success("Brand added successfully");
      queryClient.invalidateQueries({
        queryKey: ["carBrands"],
      });
    },

    onError: (error: AxiosError) => {
      if (error.response && error.response.data) {
        const data = error.response.data as ApiResponseError;
        toast.error(data.message);
      } else {
        toast.error("An unknown error occured. Please try again later.");
      }
    },
  });

  const addCarBrandHandler = (e: ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      AddCarBrandSchema.parse({ brandName });
      addCarBrandMutation.mutate({ brandName });
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

  return {
    brandName,
    setBrandName,
    errors,
    setErrors,
    onCloseModalHandler,
    addCarBrandHandler,
    addCarBrandMutation,
  };
};

export default useCreateCarBrand;
