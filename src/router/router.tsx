import { createBrowserRouter } from "react-router-dom";

import Home from "@/pages/Home/Home";
import SignIn from "@/pages/SignIn";
import SignUp from "@/pages/SignUp";
import ResetPassword from "@/pages/ResetPassword";
import ResetPasswordConfirm from "@/pages/ResetPasswordConfirm";
import AuthPagesLayout from "@/pages/AuthPagesLayout/AuthPagesLayout";
import NavFooterLayout from "@/pages/HomeLayout/HomeLayout";

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
      {
        path: "/customer/reset-password/confirm",
        element: <ResetPasswordConfirm />,
      },
    ],
  },
]);

export default router;
