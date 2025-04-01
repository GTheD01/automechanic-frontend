import { Outlet } from "react-router-dom";

import Footer from "@/layouts/HomeLayout/components/Footer";
import HeaderNav from "@/layouts/HomeLayout/components/Header";
import ScrollToTopButton from "@/layouts/HomeLayout/components/ScrollToTopButton";

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
