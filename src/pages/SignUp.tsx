import Input from "@/components/Input";
import { Link } from "react-router-dom";

function SignUp() {
  return (
    <>
      <form className="mt-8 mb-4 flex flex-col items-center space-y-4 min-w-72">
        <Input
          type="text"
          name="firstName"
          label="First Name"
          placeholder="Enter your first name"
          required={true}
        />
        <Input
          type="text"
          name="lastName"
          label="Last Name"
          placeholder="Enter your last name"
          required={true}
        />
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
        <Input
          type="password"
          name="repeatPassword"
          label="Repeat Password"
          placeholder="Repeat your password"
          required={true}
        />

        <button className="bg-secondary px-12 py-2 tracking-wider lg:text-lg md:text-base text-sm hover:bg-secondaryHover cursor-pointer w-full">
          Sign Up
        </button>
      </form>

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
