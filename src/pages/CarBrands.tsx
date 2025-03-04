import { useCallback, useState } from "react";
import { useQuery } from "@tanstack/react-query";

import Button from "@/components/Button";
import Spinner from "@/components/Spinner";
import AddCarBrandModal from "./AddCarBrandModal";
import { Pagination } from "@/components/Pagination";
import { getAdminCarBrands } from "@/services/carService";

type Props = {};

function CarBrands({}: Props) {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [addCarBrandModalState, setAddCarBrandModalState] = useState(false);
  const [totalItemsToShow, setTotalItemsToShow] = useState<number>(5);

  const { data, isError, isLoading } = useQuery({
    queryKey: ["carBrands", totalItemsToShow, currentPage - 1],
    queryFn: getAdminCarBrands,
    staleTime: 1000 * 60 * 5,
  });

  const handleCurrentPage = useCallback(
    (el: number) => {
      setCurrentPage(el);
    },
    [currentPage]
  );

  const closeAddCarBrandModal = () => {
    setAddCarBrandModalState(false);
  };

  return (
    <section>
      <AddCarBrandModal
        onClose={closeAddCarBrandModal}
        modalState={addCarBrandModalState}
      />

      <Button
        onClick={() => setAddCarBrandModalState(true)}
        className="py-2 px-4 sm-px-6 ml-2 rounded-3xl"
      >
        Add Car Brand
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
        <p className="pl-2 pt-2">No car brands found.</p>
      )}
      {isError && (
        <p className="pl-2 pt-2">
          There was an error fetching car brands. Please try again later.
        </p>
      )}
      {data && data.content && (
        <ul>
          {data.content.map((brand) => (
            <li
              key={brand.id}
              className="border-b p-4 flex items-center justify-between"
            >
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-semibold">ID:</span>
                  <p>{brand.id}</p>
                </div>
                <div className="flex items-center gap-2">
                  <span className="font-semibold">Name:</span>
                  <p>{brand.name}</p>
                </div>
              </div>
              <button
                className="bg-red-500 hover:bg-red-600 p-2 text-white text-sm md:text-base"
                // TODO: ADD DELETE CAR BRAND CONFIRMATION MODAL
                //   onClick={() => setDeleteConfirmationModal()}
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

export default CarBrands;
