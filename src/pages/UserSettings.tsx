import Form from "@/components/Form";
import { InputProps } from "@/components/Input";
import useUpdateUserProfile from "@/hooks/useUpdateUserProfile";

function UserSettings() {
  const { errors, formData, isLoading, onChange, onSubmit } =
    useUpdateUserProfile();

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
    <div>
      <h3 className="text-xl font-semibold ml-2 border-b-2">User Settings</h3>
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
  );
}

export default UserSettings;
