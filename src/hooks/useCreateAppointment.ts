import { z } from "zod";
import { AxiosError } from "axios";
import { toast } from "react-toastify";
import { ChangeEvent, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import { ApiResponseError } from "@/types/Auth";
import { getLoggedInUserCars } from "@/services/carService";
import { createAppointment } from "@/services/appointmentService";
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

const useCreateAppointment = ({
  onCloseModal,
}: {
  onCloseModal: () => void;
}) => {
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
      onCloseModal();
    },
    onError: (error: AxiosError) => {
      if (error.response && error.response.data) {
        const data = error.response.data as ApiResponseError;
        toast.error(data.message);
      } else {
        toast.error("An unknown error occured. Please try again later.");
      }
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
    onCloseModal();
    setErrors(initialErrors);
  };

  return {
    appointmentData,
    setAppointmentData,
    errors,
    setErrors,
    createAppointmentHandler,
    createAppointmentMutation,
    userCars,
    onCloseCreateAppointmentModalHandler,
  };
};

export default useCreateAppointment;
