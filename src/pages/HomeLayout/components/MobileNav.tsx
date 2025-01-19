import closeMenuCrossSvg from "@/assets/svgs/cross.svg";
import { Dispatch, useEffect, useState } from "react";
import { Link } from "react-router-dom";

function MobileNav({
  openMobileNav,
  setOpenMobileNav,
}: {
  openMobileNav: boolean;
  setOpenMobileNav: Dispatch<boolean>;
}) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const interval = setTimeout(() => {
      setIsVisible(true);
    }, 100);

    return () => clearTimeout(interval);
  }, [openMobileNav]);

  return (
    <>
      <div
        className="fixed inset-0 bg-black/50 z-40"
        onClick={() => setOpenMobileNav(false)}
      ></div>
      <div
        className={`fixed top-0 left-0 bg-secondary/70 h-full z-50 backdrop-blur-sm transition-transform duration-100 ${
          isVisible
            ? "opacity-100 translate-x-0"
            : " opacity-0 -translate-x-full"
        }`}
      >
        <div className="pt-12 text-center">
          <Link
            to={"/"}
            className="font-bold tracking-wider text-2xl"
            onClick={() => setOpenMobileNav(false)}
          >
            <span className="text-secondary bold">Auto</span> Mechanic
          </Link>
        </div>
        <nav className="flex flex-col *:tracking-wide *:text-sm *:sm:text-base pt-12 h-full">
          <a
            href="#home"
            className="hover:bg-secondaryHover px-16 py-4"
            onClick={() => setOpenMobileNav(false)}
          >
            Home
          </a>
          <a
            href="#services"
            className="hover:bg-secondaryHover px-16 py-4"
            onClick={() => setOpenMobileNav(false)}
          >
            Services
          </a>
          <a
            href="#about-us"
            className="hover:bg-secondaryHover px-16 py-4"
            onClick={() => setOpenMobileNav(false)}
          >
            About Us
          </a>

          <a
            href="#contact"
            className="hover:bg-secondaryHover px-16 py-4"
            onClick={() => setOpenMobileNav(false)}
          >
            Contact
          </a>
          <Link
            to="/customers/sign-in"
            className="px-16 mt-auto bg-white text-secondary hover:bg-secondaryHover hover:text-white py-4 font-semibold"
          >
            CUSTOMERS
          </Link>
          <button
            type="button"
            className="absolute top-0 right-0 hover:scale-110"
            onClick={() => setOpenMobileNav(false)}
          >
            <img src={closeMenuCrossSvg} className="w-8 h-8" />
          </button>
        </nav>
      </div>
    </>
  );
}

export default MobileNav;
