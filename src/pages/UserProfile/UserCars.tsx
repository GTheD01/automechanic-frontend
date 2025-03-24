import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";

import Spinner from "@/components/Spinner";
import CarList from "@/components/CarList";
import { getUserCars } from "@/services/carService";
import UserCarCard from "@/pages/UserProfile/components/UserCarCard";

function UserCars() {
  const { userId } = useParams();

  const {
    data: userCars,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["userCars", userId],
    queryFn: getUserCars,
    staleTime: 1000 * 60 * 10,
  });

  if (isLoading) {
    return <Spinner lg />;
  }

  if (isError || !userCars) {
    return <p>Couldn't fetch User's cars</p>;
  }

  if (userCars?.length < 1) {
    return <p className="ml-2 mt-2">The user has no cars added.</p>;
  }

  return <CarList userCars={userCars} CarCardComponent={UserCarCard} />;
}

export default UserCars;
