import React from "react";

import { Car } from "@/types/Car";

const CarList = React.memo(
  ({
    userCars,
    CarCardComponent,
  }: {
    userCars: Car[];
    CarCardComponent: React.ComponentType<{ car: Car }>;
  }) => {
    return (
      <ul>
        {userCars.map((car) => (
          <li key={car.id}>
            <CarCardComponent car={car} key={car.id} />
          </li>
        ))}
      </ul>
    );
  }
);

export default CarList;
