import { z } from "zod";
import { AxiosError } from "axios";
import { toast } from "react-toastify";
import { ChangeEvent, Dispatch, useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import Spinner from "@/components/Spinner";
import { ApiResponseError } from "@/types/Auth";
import { createAppointment } from "@/services/appointmentService";
import { Appointment, AppointmentRequest } from "@/types/Appointment";
import DateTimePicker from "@/pages/Appointments/components/DateTimePicker";
import { CreateAppointmentSchema } from "@/validations/appointmentValidationSchemas";

const initialErrors = {
  appointmentDate: "",
  appointmentTime: "",
  description: "",
};
const initialAppointmentData = {
  appointmentDate: "",
  appointmentTime: "",
  description: "",
};

function CreateAppointmentModal({
  appointments,
  modalStateHandler,
}: {
  appointments: Appointment[];
  modalStateHandler: Dispatch<boolean>;
}) {
  const [appointmentData, setAppointmentData] = useState<AppointmentRequest>(
    initialAppointmentData
  );
  const [errors, setErrors] = useState<AppointmentRequest>(initialErrors);

  const queryClient = useQueryClient();

  const createAppointmentMutation = useMutation({
    mutationFn: createAppointment,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["appointments"] });
      setAppointmentData(initialAppointmentData);
      toast.success("Appointment scheduled");
      modalStateHandler(false);
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
  return (
    <div className="relative">
      <div
        className="fixed inset-0 bg-black/60 z-10"
        onClick={() => modalStateHandler(false)}
      ></div>
      <div className="bg-white p-8 fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20 w-2/3 max-w-[500px]">
        <span
          onClick={() => modalStateHandler(false)}
          className="text-white absolute -top-6 -right-5 text-2xl hover:scale-110 cursor-pointer"
        >
          X
        </span>
        <h3 className="font-semibold text-center text-2xl mb-6">
          Create Appointment
        </h3>
        <form onSubmit={createAppointmentHandler} className="flex flex-col">
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
          <button
            type="submit"
            className="bg-secondary text-white rounded-3xl py-2 px-4 self-center sm:px-6 hover:bg-secondaryHover mb-2 text-sm lg:text-base mt-2"
          >
            {createAppointmentMutation.isPending ? <Spinner /> : "Submit"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default CreateAppointmentModal;
