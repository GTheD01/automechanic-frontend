import { z } from "zod";
import { AxiosError } from "axios";
import { toast } from "react-toastify";
import { ChangeEvent, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import Modal from "@/components/Modal";
import Spinner from "@/components/Spinner";
import { ApiResponseError } from "@/types/Auth";
import { Appointment } from "@/types/Appointment";
import { getLoggedInUserCars } from "@/services/carService";
import { createAppointment } from "@/services/appointmentService";
import DateTimePicker from "@/pages/Appointments/components/DateTimePicker";
import { CreateAppointmentSchema } from "@/validations/appointmentValidationSchemas";

const initialErrors = {
  carId: "",
  appointmentDate: "",
  appointmentTime: "",
  description: "",
};
const initialAppointmentData = {
  carId: "",
  appointmentDate: "",
  appointmentTime: "",
  description: "",
};

export type AppointmentForm = z.infer<typeof CreateAppointmentSchema>;

function CreateAppointmentModal({
  appointments,
  modalState,
  onClose,
}: {
  appointments: Appointment[];
  modalState: boolean;
  onClose: () => void;
}) {
  const [appointmentData, setAppointmentData] = useState<AppointmentForm>(
    initialAppointmentData
  );
  const [errors, setErrors] = useState<AppointmentForm>(initialErrors);

  const queryClient = useQueryClient();

  const { data: userCars } = useQuery({
    queryKey: ["userCars"],
    queryFn: getLoggedInUserCars,
  });

  const createAppointmentMutation = useMutation({
    mutationFn: createAppointment,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["appointments"] });
      setAppointmentData(initialAppointmentData);
      toast.success("Appointment scheduled");
      onClose();
    },
    onError: (error: AxiosError) => {
      const data = error?.response?.data as ApiResponseError;
      toast.error(data.message);
    },
  });

  const createAppointmentHandler = (e: ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();

    setErrors(initialErrors);
    try {
      CreateAppointmentSchema.parse(appointmentData);
      createAppointmentMutation.mutate(appointmentData);
    } catch (error) {
      if (error instanceof z.ZodError) {
        const newErrors: Record<string, string> = {};

        for (const issue of error.issues) {
          newErrors[issue.path[0]] = issue.message;
        }

        setErrors((prevErrors) => ({ ...prevErrors, ...newErrors }));
      }
    }
  };

  const onCloseCreateAppointmentModalHandler = () => {
    onClose();
    setErrors(initialErrors);
  };

  return (
    <Modal onClose={onCloseCreateAppointmentModalHandler} open={modalState}>
      <h3 className="font-semibold text-center text-2xl mb-6">
        Create Appointment
      </h3>
      <form onSubmit={createAppointmentHandler} className="flex flex-col gap-4">
        <div className="flex flex-col">
          <label htmlFor="car">Car</label>
          <select
            className="border outline-none p-2"
            value={appointmentData.carId}
            onChange={(e) =>
              setAppointmentData((prevAppointmentData) => ({
                ...prevAppointmentData,
                carId: e.target.value,
              }))
            }
            name="car"
          >
            <option>Select</option>
            {userCars?.map((car) => (
              <option key={car.id} value={car.id}>
                {car.carBrand.name} {car.model.name} {car.version} ({car.year})
              </option>
            ))}
          </select>
        </div>
        <DateTimePicker
          appointments={appointments}
          selectedTime={appointmentData?.appointmentTime}
          setAppointmentData={setAppointmentData}
        />
        <div className="flex flex-col">
          <label htmlFor="description">Description</label>
          <textarea
            id="description"
            value={appointmentData.description}
            onChange={(e) =>
              setAppointmentData((prevState) => ({
                ...prevState,
                description: e.target.value,
              }))
            }
            className="resize-none border border-neutral outline-none p-2 h-40"
            maxLength={255}
          />
        </div>
        {Object.values(errors).map((error, i) => (
          <p key={i} className="text-red-500 text-sm sm:text-base">
            {error}
          </p>
        ))}
        <div className="text-center space-x-1">
          <button
            type="submit"
            className="bg-secondary text-white rounded-3xl py-2 px-4 self-center sm:px-6 hover:bg-secondaryHover mb-2 text-sm lg:text-base mt-2"
          >
            {createAppointmentMutation.isPending ? <Spinner /> : "Submit"}
          </button>

          <button
            onClick={onCloseCreateAppointmentModalHandler}
            type="button"
            className="text-secondary rounded-3xl py-2 px-4 self-center sm:px-6 mb-2 text-sm lg:text-base mt-2 border hover:bg-black/10"
          >
            Cancel
          </button>
        </div>
      </form>
    </Modal>
  );
}

export default CreateAppointmentModal;
