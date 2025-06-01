import { Dispatch } from "react";

import useAddCar from "@/hooks/useAddCar";
import CarForm from "@/components/CarForm";
import Modal from "@/components/common/Modal";

function AddCarModal({
  setCarModalState,
  carModalState,
}: {
  setCarModalState: Dispatch<boolean>;
  carModalState: boolean;
}) {
  const {
    carData,
    onCloseAddCarModalHandler,
    addCarHandler,
    brandModels,
    handleOnChange,
    carBrands,
    errors,
    closeModalHandler,
    addCarMutation,
  } = useAddCar({
    setCarModalState,
  });

  return (
    <Modal open={carModalState} onClose={onCloseAddCarModalHandler}>
      <h3 className="font-semibold text-center text-2xl mb-6">Add car</h3>
      <CarForm
        handleOnChange={handleOnChange}
        carActionHandler={addCarHandler}
        brandModels={brandModels || []}
        carBrands={carBrands || []}
        carData={carData}
        errors={errors}
        isPending={addCarMutation.isPending}
        onModalClose={closeModalHandler}
      />
    </Modal>
  );
}

export default AddCarModal;
