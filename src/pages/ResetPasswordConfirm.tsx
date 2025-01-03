import { Link } from "react-router-dom";

import Form from "@/components/Form";
import { InputProps } from "@/components/Input";
import useResetPasswordConfirm from "@/hooks/useResetPasswordConfirm";

function ResetPasswordConfirm() {
  const { errors, formData, isLoading, onChange, onSubmit } =
    useResetPasswordConfirm();
  const inputConfig: InputProps[] = [
    {
      type: "text",
      label: "Email",
      name: "email",
      placeholder: "Enter your email",
      value: formData.email,
      error: errors.email,
    },
    {
      type: "text",
      label: "Token",
      name: "token",
      placeholder: "Enter your token",
      value: formData.token,
      error: errors.token,
    },
    {
      type: "password",
      label: "Password",
      name: "password",
      placeholder: "Enter your password",
      value: formData.password,
      error: errors.password,
    },
    {
      type: "password",
      label: "Repeat Password",
      name: "repeatPassword",
      placeholder: "Repeat your password",
      value: formData.repeatPassword,
      error: errors.repeatPassword,
    },
  ];
  return (
    <>
      <Form
        inputConfig={inputConfig}
        btnText="Reset Password"
        isLoading={isLoading}
        onSubmit={onSubmit}
        onChange={onChange}
      />

      <Link
        to={"/customer/sign-in"}
        className="text-sm hover:text-neutral border px-4 py-2"
      >
        Back to Sign In
      </Link>
    </>
  );
}

export default ResetPasswordConfirm;
