import { Link } from "react-router-dom";

import Form from "@/components/Form";
import { InputProps } from "@/components/Input";

function SignIn() {
  const config: InputProps[] = [
    {
      type: "text",
      label: "Email",
      name: "email",
      placeholder: "Enter your email",
      required: true,
      value: "",
      error: "",
    },
    {
      type: "password",
      label: "Password",
      name: "password",
      placeholder: "Enter your password",
      required: true,
      value: "",
      error: "",
    },
  ];
  return (
    <>
      <Form
        config={config}
        btnText="Sign In"
        isLoading={false}
        onSubmit={() => {}}
      />
      <Link
        to={"/customer/reset-password"}
        className="text-sm hover:text-neutral mb-2"
      >
        Forgotten your password?
      </Link>
      <div className="flex gap-1 border px-4 py-2">
        <p>Don't have an account?</p>
        <Link
          to={"/customer/sign-up"}
          className="text-blue-500 hover:text-blue-400"
        >
          Sign up
        </Link>
      </div>
    </>
  );
}

export default SignIn;
