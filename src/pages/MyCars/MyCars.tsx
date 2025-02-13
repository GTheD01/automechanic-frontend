import { useState } from "react";
import { useQuery } from "@tanstack/react-query";

import Button from "@/components/Button";
import Spinner from "@/components/Spinner";
import { getLoggedInUserCars } from "@/services/carService";
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
      <Button
        onClick={() => setAddCarModal(true)}
        className="ml-2 py-2 px-6 rounded-3xl"
      >
        Add car
      </Button>

      <AddCarModal
        carModalState={addCarModal}
        setCarModalState={setAddCarModal}
      />

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
