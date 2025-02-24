import { useEffect } from "react";
import { AxiosError } from "axios";
import { toast } from "react-toastify";
import { useMutation } from "@tanstack/react-query";
import { useNavigate, useSearchParams } from "react-router-dom";

import Spinner from "@/components/Spinner";
import { ApiResponseError } from "@/types/Auth";
import { verifyEmail } from "@/services/authService";

function VerifyEmail() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token");

  const verifyEmailMutation = useMutation({
    mutationFn: verifyEmail,
    retry: 0,
    onSuccess: () => {
      toast.success("Successfully verified email!");
      navigate("/sign-in");
    },
    onError: (error: AxiosError) => {
      if (error.response?.data) {
        const data = error.response.data as ApiResponseError;
        toast.error(data.message);
        navigate("/sign-in");
      }
    },
  });

  useEffect(() => {
    if (token) {
      verifyEmailMutation.mutate(token);
    }
  }, [token]);

  return <Spinner lg />;
}

export default VerifyEmail;
