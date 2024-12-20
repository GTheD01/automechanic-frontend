import Form from "@/components/Form";
import { InputProps } from "@/components/Input";
import { Link } from "react-router-dom";

function SignUp() {
  const config: InputProps[] = [
    {
      type: "text",
      label: "First Name",
      name: "firstName",
      placeholder: "Enter your first name",
      required: true,
      value: "",
      error: "",
    },
    {
      type: "text",
      label: "Last Name",
      name: "lastName",
      placeholder: "Enter your last name",
      required: true,
      value: "",
      error: "",
    },
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
    {
      type: "password",
      label: "Repeat Password",
      name: "repeatPassword",
      placeholder: "Repeat your password",
      required: true,
      value: "",
      error: "",
    },
  ];
  return (
    <>
      <Form
        config={config}
        btnText="Sign Up"
        isLoading={false}
        onSubmit={() => {}}
      />

      <div className="flex gap-1">
        <p> Already have an account?</p>
        <Link
          to={"/customer/sign-in"}
          className="text-blue-500 hover:text-blue-400"
        >
          Sign in
        </Link>
      </div>
    </>
  );
}

export default SignUp;
