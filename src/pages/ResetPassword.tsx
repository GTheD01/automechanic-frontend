import Form from "@/components/Form";
import { InputProps } from "@/components/Input";
import { Link } from "react-router-dom";

function ResetPassword() {
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
  ];
  return (
    <>
      <Form
        config={config}
        btnText="Reset Password"
        isLoading={false}
        onSubmit={() => {}}
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

export default ResetPassword;
