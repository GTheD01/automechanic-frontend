import Spinner from "@/components/Spinner";
import { verifyEmail } from "@/services/authService";
import { ApiResponseError } from "@/types/Auth";
import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { toast } from "react-toastify";

function VerifyEmail() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token");

  const verifyEmailMutation = useMutation({
    mutationFn: verifyEmail,
    onSuccess: () => {
      toast.success("Successfully verified email!");
      navigate("/customer/sign-in");
    },
    onError: (error: AxiosError) => {
      if (error.response?.data) {
        const data = error.response.data as ApiResponseError;
        toast.error(data.message);
        navigate("/customer/sign-in");
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
