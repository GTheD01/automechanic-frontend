import { createBrowserRouter } from "react-router-dom";
import Home from "../pages/Home/Home";
import NavFooterLayout from "../pages/HomeLayout/HomeLayout";
import SignIn from "@/pages/SignIn";

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
    path: "/customer/sign-in",
    element: <SignIn />,
  },
]);

export default router;
