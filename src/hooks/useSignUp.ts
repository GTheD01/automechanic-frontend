import { z } from "zod";
import { AxiosError } from "axios";
import { toast } from "react-toastify";
import { useMutation } from "@tanstack/react-query";
import { ChangeEvent, FormEvent, useState } from "react";

import { signup } from "@/services/authService";
import { ApiResponseError } from "@/types/Auth";
import { SignUpUserSchema } from "@/validations/authValidationSchemas";

type RegistrationForm = z.infer<typeof SignUpUserSchema>;

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
        "Successfully signed up! Check your email to verify your account."
      );
    },
    onError: (error: AxiosError) => {
      if (error.response?.data) {
        const data = error.response.data as ApiResponseError;

        toast.error(data.message);
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

      const parsedFormData = SignUpUserSchema.parse(formData);

      signUpMutation.mutate(parsedFormData);
    } catch (error) {
      if (error instanceof z.ZodError) {
        const newErrors: Record<string, string> = {};

        for (const issue of error.issues) {
          newErrors[issue.path[0]] = issue.message;
        }

        setErrors((prevErrors) => ({ ...prevErrors, ...newErrors }));
      } else {
        toast.error(`Unexpected error: ${error}`);
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
