import { z } from "zod";
import { AxiosError } from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { ChangeEvent, FormEvent, useState } from "react";

import { ApiResponseError } from "@/types/Auth";
import { confirmResetPassword } from "@/services/authService";
import { ResetPasswordConfirmSchema } from "@/validations/authValidationSchemas";

type ResetPasswordConfirmForm = z.infer<typeof ResetPasswordConfirmSchema>;

function useResetPasswordConfirm() {
  const navigate = useNavigate();
  const initialFormData: ResetPasswordConfirmForm = {
    email: "",
    token: "",
    newPassword: "",
    repeatNewPassword: "",
  };
  const initialErrors = {
    email: "",
    token: "",
    newPassword: "",
    repeatNewPassword: "",
  };
  const [formData, setFormData] =
    useState<ResetPasswordConfirmForm>(initialFormData);

  const [errors, setErrors] = useState(initialErrors);

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setFormData({ ...formData, [name]: value });
  };

  const resetPasswordConfirmMutation = useMutation({
    mutationFn: confirmResetPassword,
    onSuccess: () => {
      setFormData(initialFormData);
      toast.success("Password successfully reset!");
      navigate("/sign-in");
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

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      // Clear errors
      setErrors(initialErrors);

      const parsedFormData = ResetPasswordConfirmSchema.parse(formData);

      resetPasswordConfirmMutation.mutate(parsedFormData);
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
    isLoading: resetPasswordConfirmMutation.isPending,
  };
}

export default useResetPasswordConfirm;
