import { useState } from "react";
import { Link } from "react-router-dom";

import useIsLessThan from "@/hooks/useIsLessThan";
import Nav from "@/pages/HomeLayout/components/Nav";
import MobileNav from "@/pages/HomeLayout/components/MobileNav";

import menuBurgerSvg from "@/assets/svgs/menu-burger.svg";

function HeaderNav() {
  const [openMobileNav, setOpenMobileNav] = useState<boolean>(false);
  const isLessThan = useIsLessThan(700);

  return (
    <div
      className={`flex items-center ${
        openMobileNav ? "justify-end" : "justify-between"
      } gap-4 py-8 lg:px-28 px-2 border-b border-gray-500 bg-primary`}
    >
      {isLessThan && !openMobileNav && (
        <button
          type="button"
          onClick={() => setOpenMobileNav((prevState) => !prevState)}
        >
          <img src={menuBurgerSvg} alt="menu burger" className={`w-8 h-8`} />
        </button>
      )}

      {openMobileNav && (
        <MobileNav
          openMobileNav={openMobileNav}
          setOpenMobileNav={setOpenMobileNav}
        />
      )}

      {!isLessThan && (
        <Link
          to={"/"}
          className="lg:text-3xl md:text-2xl text-xl font-bold tracking-wider"
        >
          <span className="text-sky-200 bold">Auto</span> Mechanic
        </Link>
      )}

      {!isLessThan && <Nav />}

      <Link
        to={"/sign-in"}
        className="border border-sky-200 p-4 md:tracking-wider hover:text-sky-200 text-sm sm:text-base"
      >
        Customers
      </Link>
    </div>
  );
}

export default HeaderNav;
