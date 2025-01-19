import { createBrowserRouter } from "react-router-dom";

import Home from "@/pages/Home/Home";
import SignIn from "@/pages/SignIn";
import SignUp from "@/pages/SignUp";
import ResetPassword from "@/pages/ResetPassword";
import ResetPasswordConfirm from "@/pages/ResetPasswordConfirm";
import AuthPagesLayout from "@/pages/AuthPagesLayout/AuthPagesLayout";
import NavFooterLayout from "@/pages/HomeLayout/HomeLayout";
import AuthProtector from "@/lib/AuthProtector";
import ProtectedPagesLayout from "@/pages/ProtectedPagesLayout/ProtectedPagesLayout";
import Dashboard from "@/pages/Dashboard/Dashboard";
import UserContextProvider from "@/providers/UserContextProvider";
import VerifyEmail from "@/pages/VerifyEmail";
import Users from "@/pages/Users/Users";
import Appointments from "@/pages/Appointments/Appointments";
import AuthContextProvider from "@/providers/AuthContextProvider";
import User from "@/pages/User";

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
    path: "/customers",
    element: (
      <AuthContextProvider>
        <AuthProtector />
      </AuthContextProvider>
    ),
    children: [
      {
        element: <AuthPagesLayout />,
        children: [
          {
            path: "sign-in",
            element: <SignIn />,
          },
          {
            path: "sign-up",
            element: <SignUp />,
          },
          {
            path: "reset-password",
            element: <ResetPassword />,
          },
          {
            path: "reset-password/confirm",
            element: <ResetPasswordConfirm />,
          },
          {
            path: "verify-email",
            element: <VerifyEmail />,
          },
        ],
      },
      {
        element: (
          <UserContextProvider>
            <ProtectedPagesLayout />
          </UserContextProvider>
        ),
        children: [
          {
            path: "dashboard",
            element: <Dashboard />,
          },
          {
            path: "users",
            element: <Users />,
          },
          {
            path: "users/:id",
            element: <User />,
          },
          {
            path: "appointments",
            element: <Appointments />,
          },
          {
            path: "reports",
            element: <div>Reports</div>,
          },
        ],
      },
    ],
  },
]);

export default router;
