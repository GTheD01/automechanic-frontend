import { ChangeEvent, FormEvent, useState } from "react";
import { AxiosError } from "axios";

import { z } from "zod";
import { RegisterUserSchema } from "@/validations/authValidationSchemas";
import { useMutation } from "@tanstack/react-query";
import { signup } from "@/services/authService";
import { toast } from "react-toastify";

type RegistrationForm = z.infer<typeof RegisterUserSchema>;

function useSignUp() {
  const initialFormData: RegistrationForm = {
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    repeatPassword: "",
  };

  const initialErrors = {
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    repeatPassword: "",
  };

  const [formData, setFormData] = useState<RegistrationForm>(initialFormData);
  const [errors, setErrors] = useState(initialErrors);

  const signUpMutation = useMutation({
    mutationFn: signup,
    onSuccess: () => {
      setFormData(initialFormData);
      toast.success(
        "Successfully registered! Check your email to verify your account."
      );
    },
    onError: (error: AxiosError) => {
      if (error.response?.data) {
        const backendErrors = error.response.data;

        setErrors((prevErrors) => ({
          ...prevErrors,
          ...backendErrors,
        }));
      } else {
        toast.error("An unexpected error occurred. Please try again later.");
      }
    },
  });

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setFormData({ ...formData, [name]: value });
  };

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      // Clear errors
      setErrors(initialErrors);

      const parsedFormData = RegisterUserSchema.parse(formData);

      signUpMutation.mutate(parsedFormData);
    } catch (error) {
      if (error instanceof z.ZodError) {
        const newErrors: Record<string, string> = {};

        for (const issue of error.issues) {
          newErrors[issue.path[0]] = issue.message;
        }

        setErrors((prevErrors) => ({ ...prevErrors, ...newErrors }));
      } else {
        console.log("Unexpected error: ", error);
      }
    }
  };

  return {
    formData,
    onChange,
    onSubmit,
    errors,
    isLoading: signUpMutation.isPending,
  };
}

export default useSignUp;
