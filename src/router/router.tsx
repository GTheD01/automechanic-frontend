import { lazy, Suspense } from "react";
import { createBrowserRouter, Outlet } from "react-router-dom";

import Spinner from "@/components/Spinner";

import AuthPagesLayout from "@/pages/AuthPagesLayout/AuthPagesLayout";
import NavFooterLayout from "@/pages/HomeLayout/HomeLayout";
import ProtectedPagesLayout from "@/pages/ProtectedPagesLayout/ProtectedPagesLayout";
import UserContextProvider from "@/providers/UserContextProvider";
import AuthContextProvider from "@/providers/AuthContextProvider";

const Home = lazy(() => import("@/pages/Home/Home"));
const SignIn = lazy(() => import("@/pages/SignIn"));
const SignUp = lazy(() => import("@/pages/SignUp"));
const ResetPassword = lazy(() => import("@/pages/ResetPassword"));
const ResetPasswordConfirm = lazy(() => import("@/pages/ResetPasswordConfirm"));
const VerifyEmail = lazy(() => import("@/pages/VerifyEmail"));
const Dashboard = lazy(() => import("@/pages/Dashboard/Dashboard"));
const Users = lazy(() => import("@/pages/Users/Users"));
const User = lazy(() => import("@/pages/User/User"));
const Appointments = lazy(() => import("@/pages/Appointments/Appointments"));
const Reports = lazy(() => import("@/pages/Reports"));

const router = createBrowserRouter([
  {
    path: "",
    element: <NavFooterLayout />,
    children: [
      {
        index: true,
        element: (
          <Suspense fallback={<Spinner lg />}>
            <Home />
          </Suspense>
        ),
      },
    ],
  },

  {
    path: "",
    element: (
      <AuthContextProvider>
        <Outlet />
      </AuthContextProvider>
    ),
    children: [
      {
        path: "",
        element: <AuthPagesLayout />,
        children: [
          {
            path: "sign-in",
            element: (
              <Suspense fallback={<Spinner lg />}>
                <SignIn />
              </Suspense>
            ),
          },
          {
            path: "sign-up",
            element: (
              <Suspense fallback={<Spinner lg />}>
                <SignUp />
              </Suspense>
            ),
          },
          {
            path: "reset-password",
            element: (
              <Suspense fallback={<Spinner lg />}>
                <ResetPassword />
              </Suspense>
            ),
          },
          {
            path: "reset-password/confirm",
            element: (
              <Suspense fallback={<Spinner lg />}>
                <ResetPasswordConfirm />
              </Suspense>
            ),
          },
          {
            path: "verify-email",
            element: (
              <Suspense fallback={<Spinner lg />}>
                <VerifyEmail />
              </Suspense>
            ),
          },
        ],
      },

      {
        path: "",
        element: (
          <UserContextProvider>
            <ProtectedPagesLayout />
          </UserContextProvider>
        ),
        children: [
          {
            path: "dashboard",
            element: (
              <Suspense fallback={<Spinner lg />}>
                <Dashboard />
              </Suspense>
            ),
          },
          {
            path: "users",
            element: (
              <Suspense fallback={<Spinner lg />}>
                <Users />
              </Suspense>
            ),
          },
          {
            path: "users/:userId",
            element: (
              <Suspense fallback={<Spinner lg />}>
                <User />
              </Suspense>
            ),
            children: [
              {
                path: "cars",
                element: <div>cars</div>,
              },
              {
                path: "appointments",
                element: <div>appointments</div>,
              },
              {
                path: "reports",
                element: <div>reports</div>,
              },
            ],
          },
          {
            path: "appointments",
            element: (
              <Suspense fallback={<Spinner lg />}>
                <Appointments />
              </Suspense>
            ),
          },
          {
            path: "reports",
            element: (
              <Suspense fallback={<Spinner lg />}>
                <Reports />
              </Suspense>
            ),
          },
        ],
      },
    ],
  },
]);

export default router;
