import { z } from "zod";
import { AxiosError } from "axios";
import { toast } from "react-toastify";
import { useMutation } from "@tanstack/react-query";
import { ChangeEvent, FormEvent, useState } from "react";

import { ApiResponseError } from "@/types/Auth";
import { useUserContext } from "@/providers/UserContextProvider";
import { updateLoggedInUserProfile } from "@/services/userService";
import { UpdateUserProfileSchema } from "@/validations/userValidationSchemas";

type UpdateLoggedInUserProfileForm = z.infer<typeof UpdateUserProfileSchema>;

function useUpdateLoggedInUserProfile() {
  const { user, setUser } = useUserContext();

  const initialFormData: UpdateLoggedInUserProfileForm = {
    firstName: user?.firstName || "",
    lastName: user?.lastName || "",
    phoneNumber: user?.phoneNumber || "",
  };
  const [formData, setFormData] =
    useState<UpdateLoggedInUserProfileForm>(initialFormData);

  const [errors, setErrors] = useState({
    firstName: "",
    lastName: "",
    phoneNumber: "",
  });

  const updateUserProfileMutation = useMutation({
    mutationFn: updateLoggedInUserProfile,
    onSuccess: (data) => {
      setUser((prev) => ({ ...prev, ...data }));
      toast.success("Profile settings updated.!");
    },
    onError: (error: AxiosError) => {
      setFormData(initialFormData);
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

    if (
      formData.firstName === initialFormData.firstName &&
      formData.lastName === initialFormData.lastName &&
      formData.phoneNumber === initialFormData.phoneNumber
    ) {
      toast.info("No changes detected.");
      return;
    }

    try {
      setErrors({
        firstName: "",
        lastName: "",
        phoneNumber: "",
      });

      const parsedFormData = UpdateUserProfileSchema.parse(formData);
      updateUserProfileMutation.mutate({
        updateProfileUserData: parsedFormData,
      });
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
    isLoading: updateUserProfileMutation.isPending,
  };
}

export default useUpdateLoggedInUserProfile;
