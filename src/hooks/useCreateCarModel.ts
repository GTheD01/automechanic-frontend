import { z } from "zod";
import { AxiosError } from "axios";
import { toast } from "react-toastify";
import { ChangeEvent, useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import {
  AddCarModelSchema,
  AddCarModelType,
} from "@/validations/carValidationSchemas";
import { ApiResponseError } from "@/types/Auth";
import { addCarModel } from "@/services/carService";

const useCreateCarModel = ({ onCloseModal }: { onCloseModal: () => void }) => {
  const [modelName, setModelName] = useState<AddCarModelType["modelName"]>("");
  const [brandName, setBrandName] = useState<AddCarModelType["brandName"]>("");
  const [errors, setErrors] = useState<Record<string, string>>({});

  const queryClient = useQueryClient();

  const addCarModelMutation = useMutation({
    mutationFn: addCarModel,
    onError: (error: AxiosError) => {
      if (error.response && error.response.data) {
        const data = error.response.data as ApiResponseError;
        toast.error(data.message);
      } else {
        toast.error("An unknown error occured. Please try again later.");
      }
    },
    onSuccess: () => {
      onCloseModalHandler();
      toast.success("Model added successfully");
      queryClient.invalidateQueries({
        queryKey: ["carModels"],
      });
    },
  });

  const onCloseModalHandler = () => {
    setModelName("");
    setErrors({});
    onCloseModal();
  };
  const addCarModelHandler = (e: ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();

    setErrors({});

    try {
      AddCarModelSchema.parse({ brandName, modelName });
      addCarModelMutation.mutate({ brandName, modelName });
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
    addCarModelHandler,
    modelName,
    brandName,
    errors,
    onCloseModalHandler,
    setModelName,
    setBrandName,
  };
};

export default useCreateCarModel;
