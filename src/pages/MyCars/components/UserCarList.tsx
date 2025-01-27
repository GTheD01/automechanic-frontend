import React from "react";

import { Car } from "@/types/Car";
import UserCarCard from "./UserCarCard";

const UserCarList = React.memo(({ userCars }: { userCars: Car[] }) => {
  return (
    <ul>
      {userCars.map((car) => (
        <UserCarCard car={car} key={car.id} />
      ))}
    </ul>
  );
});

export default UserCarList;
