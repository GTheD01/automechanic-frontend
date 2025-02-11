import { lazy, Suspense } from "react";
import { createBrowserRouter, Outlet } from "react-router-dom";

import Spinner from "@/components/Spinner";

import AuthPagesLayout from "@/pages/AuthPagesLayout/AuthPagesLayout";
import NavFooterLayout from "@/pages/HomeLayout/HomeLayout";
import ProtectedPagesLayout from "@/pages/ProtectedPagesLayout/ProtectedPagesLayout";
import UserContextProvider from "@/providers/UserContextProvider";
import AuthContextProvider from "@/providers/AuthContextProvider";
import ProtectedRoute from "@/components/ProtectedRoute";

const Home = lazy(() => import("@/pages/Home/Home"));
const SignIn = lazy(() => import("@/pages/AuthPages/SignIn"));
const SignUp = lazy(() => import("@/pages/AuthPages/SignUp"));
const ResetPassword = lazy(() => import("@/pages/AuthPages/ResetPassword"));
const ResetPasswordConfirm = lazy(
  () => import("@/pages/AuthPages/ResetPasswordConfirm")
);
const VerifyEmail = lazy(() => import("@/pages/AuthPages/VerifyEmail"));
const Dashboard = lazy(() => import("@/pages/Dashboard/Dashboard"));
const Users = lazy(() => import("@/pages/Users/Users"));
const User = lazy(() => import("@/pages/User/User"));
const Appointments = lazy(() => import("@/pages/Appointments/Appointments"));
const Reports = lazy(() => import("@/pages/Reports"));
const UserSettings = lazy(() => import("@/pages/UserSettings"));
const UserProfile = lazy(() => import("@/pages/UserProfile"));
const MyCars = lazy(() => import("@/pages/MyCars/MyCars"));
const UserCarPage = lazy(() => import("@/pages/UserCarPage/UserCarPage"));
const MyAppointments = lazy(
  () => import("@/pages/MyAppointments/MyAppointments")
);

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
          // ADMIN ROUTES
          {
            path: "users",
            element: (
              <ProtectedRoute role="ADMIN">
                <Suspense fallback={<Spinner lg />}>
                  <Users />
                </Suspense>
              </ProtectedRoute>
            ),
          },
          {
            path: "users/:userId",
            element: (
              <ProtectedRoute role="ADMIN">
                <Suspense fallback={<Spinner lg />}>
                  <User />
                </Suspense>
              </ProtectedRoute>
            ),
          },
          {
            path: "appointments",
            element: (
              <ProtectedRoute role="ADMIN">
                <Suspense fallback={<Spinner lg />}>
                  <Appointments />
                </Suspense>
              </ProtectedRoute>
            ),
          },
          // --------------------------------------------
          {
            path: "reports",
            element: (
              <Suspense fallback={<Spinner lg />}>
                <Reports />
              </Suspense>
            ),
          },
          {
            path: "profile",
            element: (
              <Suspense fallback={<Spinner lg />}>
                <UserProfile />
              </Suspense>
            ),
          },
          {
            path: "settings",
            element: (
              <Suspense fallback={<Spinner lg />}>
                <UserSettings />
              </Suspense>
            ),
          },
          // USER ROUTES
          {
            path: "/my-cars",
            element: (
              <ProtectedRoute role="USER">
                <Suspense fallback={<Spinner />}>
                  <MyCars />
                </Suspense>
              </ProtectedRoute>
            ),
          },
          {
            path: "/my-cars/:carId",
            element: (
              <ProtectedRoute role="USER">
                <Suspense fallback={<Spinner />}>
                  <UserCarPage />
                </Suspense>
              </ProtectedRoute>
            ),
          },
          {
            path: "/my-appointments",
            element: (
              <ProtectedRoute role="USER">
                <Suspense fallback={<Spinner />}>
                  <MyAppointments />
                </Suspense>
              </ProtectedRoute>
            ),
          },
        ],
      },
    ],
  },
]);

export default router;
