import { Car } from "@/types/Car";
import Button from "@/components/Button";

function MyCarCard({ car }: { car: Car }) {
  return (
    <div className="space-y-2 border-b-2 px-2 py-2 flex justify-between items-center">
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
      <Button link to={`${car.id}`} className="py-2 px-4 rounded-3xl">
        Overview
      </Button>
    </div>
  );
}

export default MyCarCard;
