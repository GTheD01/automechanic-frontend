import { Link } from "react-router-dom";

import Form from "@/components/Form";
import { InputProps } from "@/components/Input";
import useSignUp from "@/hooks/useSignUp";

function SignUp() {
  const { formData, onChange, errors, onSubmit, isLoading } = useSignUp();
  const inputConfig: InputProps[] = [
    {
      type: "text",
      label: "First Name",
      name: "firstName",
      placeholder: "Enter your first name",
      value: formData.firstName,
      error: errors.firstName,
    },
    {
      type: "text",
      label: "Last Name",
      name: "lastName",
      placeholder: "Enter your last name",
      value: formData.lastName,
      error: errors.lastName,
    },
    {
      type: "text",
      label: "Email",
      name: "email",
      placeholder: "Enter your email",
      value: formData.email,
      error: errors.email,
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
        onChange={onChange}
        inputConfig={inputConfig}
        btnText="Sign Up"
        isLoading={isLoading}
        onSubmit={onSubmit}
      />

      <div className="flex gap-1">
        <p> Already have an account?</p>
        <Link
          to={"/customers/sign-in"}
          className="text-blue-500 hover:text-blue-400"
        >
          Sign in
        </Link>
      </div>
    </>
  );
}

export default SignUp;
