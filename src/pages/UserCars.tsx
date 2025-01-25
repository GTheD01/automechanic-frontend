import Spinner from "@/components/Spinner";
import { getUserCars } from "@/services/userService";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";

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

  return (
    <ul className="grid grid-cols-2 ml-2 pr-4">
      {userCars.map((car) => (
        <li
          key={car.id}
          className="space-y-2 border-b-2 even:border-l-2 even:pl-2 flex justify-between items-center"
        >
          <div>
            <p>
              <span className="font-bold">Brand: </span>
              <span>{car.carBrand.name}</span>
            </p>
            <p>
              <span className="font-bold">Model: </span>
              <span>{car.model.name}</span>
            </p>
            <p>
              <span className="font-bold">Year: </span>
              <span>{car.year}</span>
            </p>
          </div>
          <div className="flex flex-col">
            <button className="bg-yellow-500 hover:bg-yellow-600 px-4 py-2 text-white">
              Edit
            </button>
            <button className="bg-red-500 hover:bg-red-600 px-4 py-2 text-white">
              Delete
            </button>
          </div>
        </li>
      ))}
    </ul>
  );
}

export default UserCars;
