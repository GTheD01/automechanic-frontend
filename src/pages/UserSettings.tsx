import { useState } from "react";

import Form from "@/components/common/Form";
import { InputProps } from "@/components/common/Input";
import useDeleteLoggedInAccount from "@/hooks/useDeleteLoggedInAccount";
import useUpdateLoggedInUserProfile from "@/hooks/useUpdateLoggedInUserProfile";
import DeleteConfirmationModal from "@/components/common/DeleteConfirmationModal";

function UserSettings() {
  const [deleteAccountModalState, setDeleteAccountModalState] = useState(false);

  const { errors, formData, isLoading, onChange, onSubmit } =
    useUpdateLoggedInUserProfile();
  const { onDeleteLoggedInAccount } = useDeleteLoggedInAccount();

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
