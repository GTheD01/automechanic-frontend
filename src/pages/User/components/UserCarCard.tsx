import { Car } from "@/types/Car";

function UserCarCard({ car }: { car: Car }) {
  return (
    <div className="border-b-2 px-2 py-2 ">
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
  );
}

export default UserCarCard;
