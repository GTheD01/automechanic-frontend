import { Car } from "@/types/Car";
import { Link } from "react-router-dom";

function UserCarCard({ car }: { car: Car }) {
  return (
    <li
      key={car.id}
      className="space-y-2 border-b-2 px-2 py-2 flex justify-between items-center"
    >
      <div>
        <p>
          <span className="font-bold">Brand: </span>
          <span>{car.carBrand?.name}</span>
        </p>
        <div className="flex gap-4">
          <p>
            <span className="font-bold">Model: </span>
            <span>{car.model?.name}</span>
          </p>
          {car.version && (
            <p>
              <span className="font-bold">Version: </span>
              <span>{car.version}</span>
            </p>
          )}
        </div>
        <p>
          <span className="font-bold">Year: </span>
          <span>{car?.year}</span>
        </p>
      </div>
      <Link
        to={`${car.id}`}
        className="bg-secondary hover:bg-secondaryHover px-4 py-2 text-white rounded-3xl"
      >
        Overview
      </Link>
    </li>
  );
}

export default UserCarCard;
