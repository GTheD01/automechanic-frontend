import { Outlet } from "react-router-dom";

import HeaderNav from "./components/Header";
import Footer from "./components/Footer";
import ScrollToTopButton from "./components/ScrollToTopButton";

function NavFooterLayout() {
  return (
    <>
      <HeaderNav />

      <Outlet />

      <Footer />

      <ScrollToTopButton />
    </>
  );
}

export default NavFooterLayout;
