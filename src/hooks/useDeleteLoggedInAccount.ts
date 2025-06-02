import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";

import { deleteLoggedInUser } from "@/services/userService";
import { useAuthContext } from "@/providers/AuthContextProvider";
import { useUserContext } from "@/providers/UserContextProvider";

const useDeleteLoggedInAccount = () => {
  const navigate = useNavigate();
  const { setUser } = useUserContext();
  const { setIsAuthenticated } = useAuthContext();

  const deleteLoggedInAccountMutation = useMutation({
    mutationFn: deleteLoggedInUser,
    onSuccess() {
      setIsAuthenticated(false);
      setUser(undefined);
      navigate("/sign-in");
      toast.success("Account deleted successfully.");
    },
    onError() {
      toast.error("Couldn't delete the account.");
    },
  });

  const onDeleteLoggedInAccount = () => {
    deleteLoggedInAccountMutation.mutate();
  };

  return {
    onDeleteLoggedInAccount,
  };
};

export default useDeleteLoggedInAccount;
