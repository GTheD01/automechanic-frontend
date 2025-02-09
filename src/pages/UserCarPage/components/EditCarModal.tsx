import Modal from "@/components/Modal";
import Spinner from "@/components/Spinner";
import { editCar, getBrandModels, getCarBrands } from "@/services/carService";
import { ApiResponseError } from "@/types/Auth";
import { Car, CarDataProps } from "@/types/Car";
import { AddCarSchema } from "@/validations/carValidationSchemas";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { ChangeEvent, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { z } from "zod";

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
  const { brandName, modelName, year, version } = carData;

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

  const handleOnChange = (e: ChangeEvent<HTMLSelectElement>) => {
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

      <form onSubmit={editCarHandler} className="flex flex-col gap-4">
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
            value={version}
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
            {editCarMutation.isPending ? <Spinner /> : "Submit"}
          </button>

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

export default EditCarModal;
