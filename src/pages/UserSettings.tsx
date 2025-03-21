import { useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";

import Form from "@/components/Form";
import { InputProps } from "@/components/Input";
import { deleteLoggedInUser } from "@/services/userService";
import { useAuthContext } from "@/providers/AuthContextProvider";
import { useUserContext } from "@/providers/UserContextProvider";
import DeleteConfirmationModal from "@/components/DeleteConfirmationModal";
import useUpdateLoggedInUserProfile from "@/hooks/useUpdateLoggedInUserProfile";

function UserSettings() {
  const navigate = useNavigate();
  const { setUser } = useUserContext();
  const { setIsAuthenticated } = useAuthContext();

  const [deleteAccountModalState, setDeleteAccountModalState] = useState(false);
  const { errors, formData, isLoading, onChange, onSubmit } =
    useUpdateLoggedInUserProfile();

  const inputConfig: InputProps[] = [
    {
      type: "text",
      label: "First Name",
      name: "firstName",
      placeholder: "First Name",
      value: formData.firstName,
      error: errors.firstName,
    },
    {
      type: "text",
      label: "Last Name",
      name: "lastName",
      placeholder: "Last Name",
      value: formData.lastName,
      error: errors.lastName,
    },
    {
      type: "text",
      label: "Phone Number",
      name: "phoneNumber",
      placeholder: "Phone Number",
      value: formData.phoneNumber,
      error: errors.phoneNumber,
    },
  ];

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

  return (
    <>
      <DeleteConfirmationModal
        bodyText="Are you sure you want to delete your account? This action is irreversible."
        headerText="Delete Account"
        handleOnCloseModal={() => setDeleteAccountModalState(false)}
        modalState={deleteAccountModalState}
        onDelete={onDeleteLoggedInAccount}
      />
      <div className="relative">
        <h3 className="text-xl font-semibold ml-2 border-b-2">User Settings</h3>
        <button
          onClick={() => setDeleteAccountModalState(true)}
          className="text-red-800 hover:underline hover:text-red-950 absolute right-2 outline-none"
        >
          Delete my account
        </button>

        <Form
          method={"PUT"}
          onChange={onChange}
          inputConfig={inputConfig}
          btnText="Save"
          isLoading={isLoading}
          onSubmit={onSubmit}
          buttonClassName="text-white w-fit"
          inputClassName="border border-black text-primary"
        />
      </div>
    </>
  );
}

export default UserSettings;
