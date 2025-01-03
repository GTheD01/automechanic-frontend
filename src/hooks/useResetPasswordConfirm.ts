import { ChangeEvent, FormEvent, useState } from "react";

import { z } from "zod";
import { ResetPasswordConfirmSchema } from "@/lib/validationSchemas";

type ResetPasswordConfirmForm = z.infer<typeof ResetPasswordConfirmSchema>;

function useResetPasswordConfirm() {
  const [formData, setFormData] = useState<ResetPasswordConfirmForm>({
    email: "",
    token: "",
    password: "",
    repeatPassword: "",
  });

  const [errors, setErrors] = useState({
    email: "",
    token: "",
    password: "",
    repeatPassword: "",
  });
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setFormData({ ...formData, [name]: value });
  };

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      // Clear errors
      setErrors({
        email: "",
        token: "",
        password: "",
        repeatPassword: "",
      });

      const parsedFormData = ResetPasswordConfirmSchema.parse(formData);
      console.log("Validation passed: ", parsedFormData);

      // TODO: Make API call to sign-up (set form data and set errors)
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
    } finally {
      setIsLoading(false);
    }
  };

  return {
    formData,
    onChange,
    onSubmit,
    errors,
    isLoading,
  };
}

export default useResetPasswordConfirm;
