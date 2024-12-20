import Input from "@/components/Input";
import { Link } from "react-router-dom";

function SignIn() {
  return (
    <>
      <form className="mt-8 mb-4 flex flex-col items-center space-y-4 min-w-72">
        <Input
          type="email"
          name="email"
          label="Email"
          placeholder="Enter your email"
          required={true}
        />
        <Input
          type="password"
          name="password"
          label="Password"
          placeholder="Enter your password"
          required={true}
        />
        <Link
          to={"/customer/reset-password"}
          className="text-sm hover:text-neutral"
        >
          Forgotten your password?
        </Link>
        <button className="bg-secondary px-12 py-2 tracking-wider lg:text-lg md:text-base text-sm hover:bg-secondaryHover cursor-pointer w-full">
          Sign In
        </button>
      </form>
      <div className="flex gap-1">
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
