import { Link } from "react-router-dom";

import Form from "@/components/Form";
import { InputProps } from "@/components/Input";
import useSignIn from "@/hooks/useSignIn";

function SignIn() {
  const { formData, errors, onChange, onSubmit, isLoading } = useSignIn();
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
      type: "password",
      label: "Password",
      name: "password",
      placeholder: "Enter your password",
      value: formData.password,
      error: errors.password,
    },
  ];
  return (
    <>
      <Form
        onChange={onChange}
        inputConfig={inputConfig}
        btnText="Sign In"
        isLoading={isLoading}
        onSubmit={onSubmit}
      />
      <Link to={"/reset-password"} className="text-sm hover:text-neutral mb-2">
        Forgotten your password?
      </Link>
      <div className="flex gap-1 border px-4 py-2">
        <p>Don't have an account?</p>
        <Link to={"/sign-up"} className="text-blue-500 hover:text-blue-400">
          Sign up
        </Link>
      </div>
    </>
  );
}

export default SignIn;
