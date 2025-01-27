import { useState } from "react";
import { useQuery } from "@tanstack/react-query";

import { getLoggedInUserCars } from "@/services/carsService";
import AddCarModal from "./components/AddCarModal";
import Spinner from "@/components/Spinner";
import UserCarList from "./components/UserCarList";

function LoggedInUserCars() {
  const [addCarModal, setAddCarModal] = useState<boolean>(false);
  const {
    data: loggedInUserCars,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["userCars"],
    queryFn: getLoggedInUserCars,
    staleTime: 1000 * 60 * 15,
    retry: 0,
  });

  return (
    <div>
      <button
        className="bg-secondary hover:bg-secondaryHover text-white px-6 py-2"
        onClick={() => setAddCarModal(true)}
      >
        Add car
      </button>
      {addCarModal && <AddCarModal setCarModalState={setAddCarModal} />}

      {isLoading && (
        <div className="pl-2 pt-2">
          <Spinner md />
        </div>
      )}
      {(isError || !loggedInUserCars) && (
        <p>Unable to load car data at this time.</p>
      )}
      {loggedInUserCars && <UserCarList userCars={loggedInUserCars} />}
    </div>
  );
}

export default LoggedInUserCars;
