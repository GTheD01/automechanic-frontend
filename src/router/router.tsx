import { createBrowserRouter } from "react-router-dom";
import Home from "../pages/Home/Home";
import NavFooterLayout from "../pages/HomeLayout/HomeLayout";

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
