import { z } from "zod";
import { AxiosError } from "axios";
import { toast } from "react-toastify";
import { ChangeEvent, useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import Modal from "@/components/Modal";
import Input from "@/components/Input";
import Button from "@/components/Button";
import {
  AddCarBrandSchema,
  AddCarBrandType,
} from "@/validations/carValidationSchemas";
import { ApiResponseError } from "@/types/Auth";
import { addCarBrand } from "@/services/carService";

function AddCarBrandModal({
  onClose,
  modalState,
}: {
  modalState: boolean;
  onClose: () => void;
}) {
  const [brandName, setBrandName] = useState<AddCarBrandType["brandName"]>("");
  const [errors, setErrors] = useState<Record<string, string>>({});

  const onCloseModalHandler = () => {
    setBrandName("");
    setErrors({});
    onClose();
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
        console.log(error);
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

  return (
    <Modal onClose={onCloseModalHandler} open={modalState} className="w-fit">
      <form onSubmit={addCarBrandHandler}>
        <Input
          label="Brand name"
          name="brandName"
          type="text"
          value={brandName}
          className="border border-black text-black"
          onChange={(e) => setBrandName(e.target.value)}
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

export default AddCarBrandModal;
