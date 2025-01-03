import { ChangeEvent, FormEvent, useState } from "react";

import { z } from "zod";
import { RegisterUserSchema } from "@/lib/validationSchemas";

type RegistrationForm = z.infer<typeof RegisterUserSchema>;

function useSignUp() {
  const [formData, setFormData] = useState<RegistrationForm>({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    repeatPassword: "",
  });

  const [errors, setErrors] = useState({
    firstName: "",
    lastName: "",
    email: "",
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
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        repeatPassword: "",
      });

      const parsedFormData = RegisterUserSchema.parse(formData);
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

  // TODO: Return isLoading when making API request

  return {
    formData,
    onChange,
    onSubmit,
    errors,
    isLoading,
  };
}

export default useSignUp;
