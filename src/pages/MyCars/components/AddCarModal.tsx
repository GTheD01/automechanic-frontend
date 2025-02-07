import { z } from "zod";
import { AxiosError } from "axios";
import { v4 as uuidv4 } from "uuid";
import { toast } from "react-toastify";
import { ChangeEvent, Dispatch, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import Modal from "@/components/Modal";
import Spinner from "@/components/Spinner";
import { ApiResponseError } from "@/types/Auth";
import { Car, CarDataProps } from "@/types/Car";
import { AddCarSchema } from "@/validations/carValidationSchemas";
import { addCar, getBrandModels, getCarBrands } from "@/services/carsService";

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

  const { brandName, modelName, year } = carData;

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

  const handleOnChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target;
    setCarData((prevData) => ({ ...prevData, [name]: value }));
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

  return (
    <Modal open={carModalState} onClose={onCloseAddCarModalHandler}>
      <h3 className="font-semibold text-center text-2xl mb-6">Add car</h3>

      <form onSubmit={addCarHandler} className="flex flex-col gap-4">
        <div className="flex flex-col">
          <label htmlFor="year">Brand</label>
          <select
            className="border p-2 outline-none"
            value={brandName}
            onChange={handleOnChange}
            name="brandName"
          >
            <option>Select</option>
            {carBrands?.map((brand) => (
              <option key={brand.id} value={brand.name}>
                {brand.name}
              </option>
            ))}
          </select>
          {errors.brandName && (
            <p className="text-red-500 text-sm sm:text-base">
              {errors.brandName}
            </p>
          )}
        </div>
        <div className="flex flex-col">
          <label htmlFor="carModel">Model</label>
          <select
            className="border outline-none p-2"
            value={modelName}
            onChange={handleOnChange}
            name="modelName"
          >
            <option>Select</option>
            {brandModels?.map((model) => (
              <option key={model.id}>{model.name}</option>
            ))}
          </select>
          {errors.modelName && (
            <p className="text-red-500 text-sm sm:text-base">
              {errors.modelName}
            </p>
          )}
        </div>

        <div className="flex flex-col">
          <label htmlFor="version">Version</label>
          <input
            id="version"
            name="version"
            placeholder="eg. GTI, Turbo"
            className="border outline-none p-2"
            onChange={(e) =>
              setCarData((prevData) => ({
                ...prevData,
                version: e.target.value,
              }))
            }
          />
        </div>

        <div className="flex flex-col">
          <label htmlFor="year">Year</label>
          <select
            className="border outline-none p-2"
            value={year}
            onChange={handleOnChange}
            name="year"
          >
            <option>Select</option>
            {Array.from(
              { length: new Date().getFullYear() - 1990 + 1 },
              (_, index) => 1990 + index
            ).map((year) => (
              <option key={year} value={year}>
                {year}
              </option>
            ))}
          </select>
          {errors.year && (
            <p className="text-red-500 text-sm sm:text-base">{errors.year}</p>
          )}
        </div>
        <div className="text-center space-x-1">
          <button
            type="submit"
            className="bg-secondary text-white rounded-3xl py-2 px-4 self-center sm:px-6 hover:bg-secondaryHover mb-2 text-sm lg:text-base mt-2"
          >
            {addCarMutation.isPending ? <Spinner /> : "Submit"}
          </button>

          <button
            onClick={() => setCarModalState(false)}
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

export default AddCarModal;
