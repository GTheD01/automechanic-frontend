import { Car } from "@/types/Car";

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
      <div className="flex flex-col">
        <button className="bg-yellow-500 hover:bg-yellow-600 px-4 py-2 text-white">
          Edit
        </button>
        <button className="bg-red-500 hover:bg-red-600 px-4 py-2 text-white">
          Delete
        </button>
      </div>
    </li>
  );
}

export default UserCarCard;
