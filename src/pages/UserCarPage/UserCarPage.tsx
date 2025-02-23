import { useState } from "react";
import { toast } from "react-toastify";
import { useMutation, useQuery } from "@tanstack/react-query";
import { Navigate, useNavigate, useParams } from "react-router-dom";

import Button from "@/components/Button";
import Spinner from "@/components/Spinner";
import { deleteCar, getCar } from "@/services/carService";
import EditCarModal from "@/pages/UserCarPage/components/EditCarModal";
import CarDeleteConfirmationModal from "@/components/DeleteConfirmationModal";
import AppointmentsList from "@/pages/Appointments/components/AppointmentsList";

function UserCarPage() {
  const [deleteConfirmationModal, setDeleteConfirmationModal] =
    useState<boolean>(false);
  const [editCarModal, setEditCarModal] = useState<boolean>(false);
  const { carId } = useParams();
  const navigate = useNavigate();

  const {
    data: carData,
    isError,
    isLoading,
  } = useQuery({
    queryKey: ["userCar", carId],
    queryFn: getCar,
    retry: 0,
  });

  const handleOnCloseDeleteCarModal = () => {
    setDeleteConfirmationModal(false);
  };

  const handleOnCloseEditCarModal = () => {
    setEditCarModal(false);
  };

  const deleteCarMutation = useMutation({
    mutationKey: ["userCar"],
    mutationFn: deleteCar,
    onSuccess: () => {
      toast.success("Car successfully deleted.");
      navigate("/my-cars");
    },
    onError: () => {
      toast.error("Couldn't delete the car. Try again later!");
    },
  });

  const deleteCarHandler = () => {
    deleteCarMutation.mutate(carId);
    handleOnCloseDeleteCarModal();
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center pt-12">
        <Spinner md />
      </div>
    );
  }

  if (isError) {
    return <Navigate to={"/my-cars"} />;
  }

  return (
    <>
      <EditCarModal
        open={editCarModal}
        onClose={handleOnCloseEditCarModal}
        car={carData}
      />

      <CarDeleteConfirmationModal
        modalState={deleteConfirmationModal}
        handleOnCloseModal={handleOnCloseDeleteCarModal}
        onDelete={deleteCarHandler}
        bodyText={`${carData?.carBrand.name} ${carData?.model.name} ${carData?.version} (${carData?.year})`}
        headerText="Are you sure you want to delete this car?"
      />
      <section>
        <Button to="/my-cars" link className="py-2 px-4">
          Back to Cars List
        </Button>

        <div className="pt-8 border-b-2 flex items-center justify-center flex-col gap-3 pb-4">
          <h5 className="font-semibold text-2xl">
            {carData && carData.carBrand?.name}
          </h5>
          <div className="flex gap-8">
            <div className="text-center">
              <span className="font-semibold">Model</span>
              <p>{carData && carData.model?.name}</p>
            </div>
            <div className="text-center">
              <span className="font-semibold">Year</span>
              <p>{carData && carData?.year}</p>
            </div>
            <div className="text-center">
              <span className="font-semibold">Version</span>
              <p>{carData && carData.version ? carData.version : "None"}</p>
            </div>
          </div>
          <div>
            <button
              className="bg-yellow-500 hover:bg-yellow-600 p-2 w-20 text-white"
              onClick={() => setEditCarModal(true)}
            >
              EDIT
            </button>
            <button
              className="bg-red-500 hover:bg-red-600 p-2 w-20 text-white"
              onClick={() => setDeleteConfirmationModal(true)}
            >
              DELETE
            </button>
          </div>
        </div>
        {carData && carData.appointments.length < 1 && (
          <p>This car has no appointments yet.</p>
        )}
        {carData && (
          <AppointmentsList appointments={carData.appointments} carPage />
        )}
      </section>
    </>
  );
}

export default UserCarPage;
