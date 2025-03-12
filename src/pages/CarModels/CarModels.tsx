import { useCallback, useState } from "react";
import { useQuery } from "@tanstack/react-query";

import Button from "@/components/Button";
import Spinner from "@/components/Spinner";
import { Pagination } from "@/components/Pagination";
import { getAllCarModels } from "@/services/carService";
import AddCarModelModal from "@/pages/CarModels/components/AddCarModelModal";

function CarModels() {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalItemsToShow, setTotalItemsToShow] = useState<number>(5);
  const [addCarModelModalState, setAddCarModelModalState] =
    useState<boolean>(false);

  const closeAddCarModelModal = () => {
    setAddCarModelModalState(false);
  };

  const handleCurrentPage = useCallback(
    (el: number) => {
      setCurrentPage(el);
    },
    [currentPage]
  );

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
