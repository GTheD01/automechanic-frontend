import { z } from "zod";
import { AxiosError } from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { ChangeEvent, FormEvent, useState } from "react";

import { signin } from "@/services/authService";
import { ApiResponseError } from "@/types/Auth";
import { useAuthContext } from "@/providers/AuthContextProvider";
import { SignInUserSchema } from "@/validations/authValidationSchemas";

type SignInForm = z.infer<typeof SignInUserSchema>;

function useSignIn() {
  const navigate = useNavigate();
  const { setIsAuthenticated } = useAuthContext();

  const initialFormData: SignInForm = {
    email: "",
    password: "",
  };
  const [formData, setFormData] = useState<SignInForm>(initialFormData);

  const [errors, setErrors] = useState({
    email: "",
    password: "",
  });

  const signInMutation = useMutation({
    mutationFn: signin,
    onSuccess: () => {
      setIsAuthenticated(true);
      setFormData(initialFormData);
      toast.success("Successfully signed in!");
      navigate("/dashboard");
    },
    onError: (error: AxiosError) => {
      if (error.response && error.response.data) {
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
      setErrors({
        email: "",
        password: "",
      });

      const parsedFormData = SignInUserSchema.parse(formData);
      signInMutation.mutate(parsedFormData);
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
    isLoading: signInMutation.isPending,
  };
}

export default useSignIn;
