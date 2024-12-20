import Input from "@/components/Input";
import { Link } from "react-router-dom";

function ResetPassword() {
  return (
    <>
      <form className="mt-8 mb-4 space-y-4 flex flex-col items-center min-w-72">
        <Input
          type="email"
          name="email"
          label="Email"
          placeholder="Enter your email"
          required={true}
        />
        <button className="bg-secondary px-6 py-2 tracking-wider lg:text-lg md:text-base text-sm hover:bg-secondaryHover cursor-pointer w-full">
          Reset Password
        </button>
      </form>

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
