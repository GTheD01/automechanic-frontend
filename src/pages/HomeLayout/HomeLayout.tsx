import { Outlet } from "react-router-dom";

import Footer from "@/pages/HomeLayout/components/Footer";
import HeaderNav from "@/pages/HomeLayout/components/Header";
import ScrollToTopButton from "@/pages/HomeLayout/components/ScrollToTopButton";

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
