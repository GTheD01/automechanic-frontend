import router from "./router/router";
import { ToastContainer } from "react-toastify";
import { RouterProvider } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import "./App.css";

const queryClient = new QueryClient();

function App() {
  return (
    <>
      <ToastContainer
        limit={3}
        newestOnTop
        autoClose={1000}
        closeOnClick
        hideProgressBar
      />
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
      </QueryClientProvider>
    </>
  );
}

export default App;
