import Spinner from "@/components/Spinner";
import { getCar } from "@/services/carsService";
import { useQuery } from "@tanstack/react-query";
import { Link, Navigate, useParams } from "react-router-dom";
import AppointmentsList from "../Appointments/components/AppointmentsList";
import { useState } from "react";
import CarDeleteConfirmationModal from "./components/CarDeleteConfirmationModal";

function UserCarPage() {
  const [deleteConfirmationModal, setDeleteConfirmationModal] = useState(false);
  const { carId } = useParams();

  const {
    data: carData,
    isError,
    isLoading,
  } = useQuery({
    queryKey: ["car", carId],
    queryFn: getCar,
    retry: 0,
  });

  if (isError) {
    return <Navigate to={"/my-cars"} />;
  }

  const handleOnCloseDeleteCarModal = () => {
    setDeleteConfirmationModal(false);
  };

  const deleteCarHandler = () => {
    console.log("Deleted car");
    handleOnCloseDeleteCarModal();
  };

  return (
    <>
      <CarDeleteConfirmationModal
        deleteConfirmationModal={deleteConfirmationModal}
        handleOnCloseDeleteCarModal={handleOnCloseDeleteCarModal}
        onDelete={deleteCarHandler}
        bodyText={`${carData?.carBrand.name} ${carData?.model.name} ${carData?.version} (${carData?.year})`}
      />
      <section>
        <Link
          to={"/my-cars"}
          className="bg-secondary hover:bg-secondaryHover text-white px-4 py-2"
        >
          Back to Cars List
        </Link>
        {isLoading && (
          <div className="flex items-center justify-center pt-12">
            <Spinner md />
          </div>
        )}

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
            <button className="bg-yellow-500 hover:bg-yellow-600 p-2 w-20 text-white">
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
          <AppointmentsList
            appointments={carData.appointments}
            isError={isError}
            isLoading={isLoading}
            carPage
          />
        )}
      </section>
    </>
  );
}

export default UserCarPage;
