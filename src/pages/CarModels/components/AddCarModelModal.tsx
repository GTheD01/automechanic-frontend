import { z } from "zod";
import { AxiosError } from "axios";
import { toast } from "react-toastify";
import { ChangeEvent, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import Modal from "@/components/Modal";
import Input from "@/components/Input";
import Button from "@/components/Button";
import {
  AddCarModelSchema,
  AddCarModelType,
} from "@/validations/carValidationSchemas";
import { ApiResponseError } from "@/types/Auth";
import { addCarModel, getCarBrands } from "@/services/carService";

function AddCarModelModal({
  onClose,
  modalState,
}: {
  modalState: boolean;
  onClose: () => void;
}) {
  const [modelName, setModelName] = useState<AddCarModelType["modelName"]>("");
  const [brandName, setBrandName] = useState<AddCarModelType["brandName"]>("");
  const [errors, setErrors] = useState<Record<string, string>>({});

  const { data } = useQuery({
    queryKey: ["carBrands"],
    queryFn: getCarBrands,
  });

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
    onClose();
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

  return (
    <Modal onClose={onCloseModalHandler} open={modalState} className="w-fit">
      <form onSubmit={addCarModelHandler}>
        <label className="text-lg">Brand name</label>
        <select
          className="w-full p-2 border outline-none rounded-md mb-2"
          value={brandName}
          onChange={(e) => {
            setBrandName(
              e.target.value === "Select Brand" ? "" : e.target.value
            );
          }}
        >
          <option>Select Brand</option>
          {data &&
            data.map((brand) => <option key={brand.id}>{brand.name}</option>)}
        </select>
        <Input
          label="Model name"
          name="modelName"
          type="text"
          placeholder="Enter model name"
          value={modelName}
          className="border border-gray-200 text-black"
          onChange={(e) => setModelName(e.target.value)}
          disabled={!brandName}
          toolTipMessage={!brandName ? "Brand must be selected" : ""}
        />

        {Object.values(errors).map((error, i) => (
          <p key={i} className="text-red-500 text-sm sm:text-base">
            {error}
          </p>
        ))}
        <div className="text-center space-x-1 mt-2">
          <Button className="rounded-3xl py-2 px-4 sm:px-6 hover:bg-secondaryHover text-sm lg:text-base">
            Submit
          </Button>
          <button
            onClick={onClose}
            type="button"
            className="text-secondary rounded-3xl py-2 px-4 self-center sm:px-6 mb-2 text-sm lg:text-base mt-2 border hover:bg-black/10"
          >
            Cancel
          </button>
        </div>
      </form>
    </Modal>
  );
}

export default AddCarModelModal;
