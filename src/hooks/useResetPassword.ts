import { z } from "zod";
import { AxiosError } from "axios";
import { toast } from "react-toastify";
import { useMutation } from "@tanstack/react-query";
import { ChangeEvent, FormEvent, useState } from "react";

import { ResetPasswordSchema } from "@/validations/authValidationSchemas";
import { resetPassword } from "@/services/authService";
import { ApiResponseError } from "@/types/Auth";
import { useNavigate } from "react-router-dom";

type ResetPasswordForm = z.infer<typeof ResetPasswordSchema>;

function useResetPassword() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState<ResetPasswordForm>({
    email: "",
  });

  const [errors, setErrors] = useState({
    email: "",
  });

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setFormData({ ...formData, [name]: value });
  };

  const forgotPasswordMutation = useMutation({
    mutationFn: resetPassword,
    onSuccess: () => {
      toast.success("Password reset token sent to your email!");
      navigate("/customers/reset-password/confirm");
    },
    onError: (error: AxiosError) => {
      if (error.response?.data) {
        const data = error.response.data as ApiResponseError;
        toast.error(data.message);
      }
    },
  });

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      setErrors({
        email: "",
      });

      const parsedFormData = ResetPasswordSchema.parse(formData);

      forgotPasswordMutation.mutate(parsedFormData);
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
    isLoading: forgotPasswordMutation.isPending,
  };
}

export default useResetPassword;
