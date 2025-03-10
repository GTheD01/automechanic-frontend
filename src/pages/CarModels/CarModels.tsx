import { useState } from "react";

import Button from "@/components/Button";
import AddCarModelModal from "./components/AddCarModelModal";

function CarModels() {
  const [addCarModelModalState, setAddCarModelModalState] =
    useState<boolean>(false);

  const closeAddCarModelModal = () => {
    setAddCarModelModalState(false);
  };

  return (
    <section>
      <AddCarModelModal
        onClose={closeAddCarModelModal}
        modalState={addCarModelModalState}
      />

      <Button
        onClick={() => setAddCarModelModalState(true)}
        className="py-2 px-4 sm-px-6 ml-2 rounded-3xl"
      >
        Add Car Model
      </Button>
    </section>
  );
}

export default CarModels;
