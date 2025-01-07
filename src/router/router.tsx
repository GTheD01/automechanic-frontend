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
  {
    element: (
      <UserContextProvider>
        <AuthProtector />
      </UserContextProvider>
    ),
    children: [
      {
        element: <ProtectedPagesLayout />,
        children: [
          {
            path: "/dashboard",
            element: <Dashboard />,
          },
          {
            path: "/users",
            element: <div>Users</div>,
          },
          {
            path: "/appointments",
            element: <div>Appointments</div>,
          },
          {
            path: "/reports",
            element: <div>Reports</div>,
          },
        ],
      },
    ],
  },
]);

export default router;
