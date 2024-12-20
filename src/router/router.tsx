import { createBrowserRouter } from "react-router-dom";
import Home from "../pages/Home/Home";
import NavFooterLayout from "../pages/HomeLayout/HomeLayout";
import SignIn from "@/pages/SignIn";
import AuthPagesLayout from "@/pages/AuthPagesLayout/AuthPagesLayout";
import SignUp from "@/pages/SignUp";
import ResetPassword from "@/pages/ResetPassword";

const router = createBrowserRouter([
  {
    path: "",
    element: <NavFooterLayout />,
    children: [
      {
        index: true,
        element: <Home />,
      },
    ],
  },
  {
    path: "/customer",
    element: <AuthPagesLayout />,
    children: [
      {
        path: "/customer/sign-in",
        element: <SignIn />,
      },
      {
        path: "/customer/sign-up",
        element: <SignUp />,
      },
      {
        path: "/customer/reset-password",
        element: <ResetPassword />,
      },
    ],
  },
]);

export default router;
