import { Link } from "react-router-dom";

import Form from "@/components/common/Form";
import { InputProps } from "@/components/common/Input";
import useRequestResetPassword from "@/hooks/useResetPassword";

function ResetPassword() {
  const { errors, formData, isLoading, onChange, onSubmit } =
    useRequestResetPassword();
  const config: InputProps[] = [
    {
      type: "text",
      label: "Email",
      name: "email",
      placeholder: "Enter your email",
      value: formData.email,
      error: errors.email,
    },
  ];

  return (
    <>
      <Form
        inputConfig={config}
        btnText="Send confirmation token"
        isLoading={isLoading}
        onSubmit={onSubmit}
        onChange={onChange}
      />

      <Link
        to={"/sign-in"}
        className="text-sm hover:text-neutral border px-4 py-2"
      >
        Back to Sign In
      </Link>
    </>
  );
}

export default ResetPassword;
