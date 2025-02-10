import { ChangeEvent } from "react";

import Spinner from "./Spinner";
import { CarBrand, CarDataProps, CarModel } from "@/types/Car";

interface CarFormProps {
  carActionHandler: (e: ChangeEvent<HTMLFormElement>) => void;
  carData: CarDataProps;
  errors: CarDataProps;
  handleOnChange: (
    e: ChangeEvent<HTMLSelectElement | HTMLInputElement>
  ) => void;
  carBrands: CarBrand[];
  brandModels: CarModel[];
  isPending: boolean;
  onModalClose: () => void;
}

function CarForm({
  carActionHandler,
  carData,
  errors,
  handleOnChange,
  brandModels,
  carBrands,
  isPending,
  onModalClose,
}: CarFormProps) {
  const { brandName, modelName, year, version } = carData;

  return (
    <form onSubmit={carActionHandler} className="flex flex-col gap-4">
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
          value={version}
          className="border outline-none p-2"
          onChange={handleOnChange}
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
      {isPending && (
        <div className="flex justify-center">
          <Spinner lg />
        </div>
      )}
      {!isPending && (
        <div className="text-center space-x-1">
          <button
            type="submit"
            className="bg-secondary text-white rounded-3xl py-2 px-4 self-center sm:px-6 hover:bg-secondaryHover mb-2 text-sm lg:text-base mt-2"
          >
            Submit
          </button>

          <button
            onClick={onModalClose}
            type="button"
            className="text-secondary rounded-3xl py-2 px-4 self-center sm:px-6 mb-2 text-sm lg:text-base mt-2 border hover:bg-black/10"
          >
            Cancel
          </button>
        </div>
      )}
    </form>
  );
}

export default CarForm;
