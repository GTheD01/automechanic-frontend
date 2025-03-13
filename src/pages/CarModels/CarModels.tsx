import { useCallback, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import Button from "@/components/Button";
import Spinner from "@/components/Spinner";
import { Pagination } from "@/components/Pagination";
import { deleteCarModel, getAllCarModels } from "@/services/carService";
import AddCarModelModal from "@/pages/CarModels/components/AddCarModelModal";
import { CarModel } from "@/types/Car";
import DeleteConfirmationModal from "@/components/DeleteConfirmationModal";
import { toast } from "react-toastify";

function CarModels() {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalItemsToShow, setTotalItemsToShow] = useState<number>(5);
  const [deleteConfirmationModalState, setDeleteConfirmationModalState] =
    useState<boolean>(false);
  const [addCarModelModalState, setAddCarModelModalState] =
    useState<boolean>(false);
  const [modelToDelete, setModelToDelete] = useState<CarModel["name"]>("");

  const openDeleteConfirmationModal = (brandName: CarModel["name"]) => {
    setDeleteConfirmationModalState(true);
    setModelToDelete(brandName);
  };

  const closeDeleteCarModelModal = () => {
    setDeleteConfirmationModalState(false);
  };

  const closeAddCarModelModal = () => {
    setAddCarModelModalState(false);
  };

  const handleCurrentPage = useCallback(
    (el: number) => {
      setCurrentPage(el);
    },
    [currentPage]
  );

  const queryClient = useQueryClient();

  const deleteCarModelMutation = useMutation({
    mutationKey: ["deleteCarModel"],
    mutationFn: deleteCarModel,
    onSuccess: () => {
      toast.success("Model deleted successfully");
    },
    onMutate: (modelName) => {
      queryClient.setQueryData(
        ["carModels", totalItemsToShow, currentPage - 1],
        (oldData: any) => {
          const newData = oldData.content.filter(
            (model: CarModel) => model.name !== modelName
          );
          return { ...oldData, content: newData };
        }
      );
      return modelName;
    },
    onError: () => {
      toast.error("An unknown error occured. Please try again later.");
    },
  });

  const deleteCarModelHandler = () => {
    deleteCarModelMutation.mutate(modelToDelete);
    closeDeleteCarModelModal();
  };

  const { data, isLoading, isError } = useQuery({
    queryKey: ["carModels", totalItemsToShow, currentPage - 1],
    queryFn: getAllCarModels,
  });

  return (
    <section>
      <AddCarModelModal
        onClose={closeAddCarModelModal}
        modalState={addCarModelModalState}
      />

      <DeleteConfirmationModal
        headerText="Are you sure you want to delete this car model?"
        bodyText={`This action can't be undone.`}
        onDelete={deleteCarModelHandler}
        modalState={deleteConfirmationModalState}
        handleOnCloseModal={closeDeleteCarModelModal}
      />

      <Button
        onClick={() => setAddCarModelModalState(true)}
        className="py-2 px-4 sm-px-6 ml-2 rounded-3xl"
      >
        Add Car Model
      </Button>

      <div className="w-fit mt-2 ml-2 p-2 flex flex-col items-center">
        <p className="font-semibold">Total items to show</p>
        <select
          disabled={
            isLoading || (data && data.page && data.page.totalElements < 3)
          }
          defaultValue={totalItemsToShow}
          className="outline-none border w-full p-1"
          onChange={(e) => setTotalItemsToShow(Number(e.target.value))}
        >
          <option>select</option>
          {Array.from({ length: 10 }, (_, index) => index).map((num) => (
            <option key={num} value={num + 1}>
              {num + 1}
            </option>
          ))}
        </select>
      </div>

      {isLoading && <Spinner lg />}
      {data && data.content && data.content.length < 1 && (
        <p className="pl-2 pt-2">No car models found.</p>
      )}
      {isError && (
        <p className="pl-2 pt-2">
          There was an error fetching car models. Please try again later.
        </p>
      )}
      {data && data.content && (
        <ul>
          {data.content.map((model) => (
            <li
              key={model.id}
              className="border-b p-4 flex items-center justify-between"
            >
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-semibold">ID:</span>
                  <p>{model.id}</p>
                </div>
                <div className="flex items-center gap-2">
                  <span className="font-semibold">Name:</span>
                  <p>{model.name}</p>
                </div>
              </div>
              <button
                className="bg-red-500 hover:bg-red-600 p-2 text-white text-sm md:text-base outline-none"
                onClick={() => openDeleteConfirmationModal(model.name)}
              >
                DELETE
              </button>
            </li>
          ))}
        </ul>
      )}
      {data && data.page && (
        <Pagination
          currentPage={currentPage}
          handleCurrentPage={handleCurrentPage}
          totalPages={data.page.totalPages}
        />
      )}
    </section>
  );
}

export default CarModels;
