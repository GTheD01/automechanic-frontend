import { createBrowserRouter } from "react-router-dom";
import Home from "../pages/Home";
import NavFooterLayout from "../pages/HomeLayout";

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
]);

export default router;
