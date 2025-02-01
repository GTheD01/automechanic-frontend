import { useState } from "react";
import { useQuery } from "@tanstack/react-query";

import Spinner from "@/components/Spinner";
import { getLoggedInUserCars } from "@/services/carsService";
import AddCarModal from "@/pages/MyCars/components/AddCarModal";
import UserCarList from "@/pages/MyCars/components/UserCarList";

function MyCars() {
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
        className="ml-2 bg-secondary hover:bg-secondaryHover text-white px-6 py-2 rounded-3xl"
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
      {loggedInUserCars && loggedInUserCars.length < 1 && (
        <p className="pl-2 pt-2">User has no added cars.</p>
      )}
      {loggedInUserCars && <UserCarList userCars={loggedInUserCars} />}
    </div>
  );
}

export default MyCars;
