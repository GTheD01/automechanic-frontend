import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import { User } from "@/types/User";
import { PageableResponse } from "@/types/GlobalTypes";
import { deleteUserAccountById } from "@/services/userService";

const useDeleteUserAccount = ({
  userId,
}: {
  userId: User["id"] | undefined;
}) => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const deleteUserAccountMutation = useMutation({
    mutationFn: deleteUserAccountById,
    onSuccess() {
      navigate("/users");
      toast.success("Account deleted successfully.");
    },
    onMutate(userToDeleteId: User["id"]) {
      queryClient.setQueryData(
        ["users"],
        (oldData: PageableResponse<User[]>) => {
          return oldData.content.filter((user) => user.id !== userToDeleteId);
        }
      );

      return userToDeleteId;
    },
    onError() {
      toast.error("Couldn't delete the account.");
    },
  });

  const onDeleteAccount = () => {
    if (userId) {
      deleteUserAccountMutation.mutate(userId);
    }
  };

  return {
    onDeleteAccount,
  };
};

export default useDeleteUserAccount;
