import { Link } from "react-router-dom";
import Nav from "./Nav";
import useIsLessThan from "@/hooks/useIsLessThan";
import menuBurgerSvg from "@/assets/svgs/menu-burger.svg";

function HeaderNav() {
  const isLessThan = useIsLessThan(700);

  return (
    <div className="flex gap-4 items-center justify-between py-8 lg:px-28 px-2 border-b border-gray-500 bg-primary">
      {isLessThan && (
        <button type="button">
          <img src={menuBurgerSvg} alt="menu burger" className="w-12 h-12" />
        </button>
      )}

      <Link
        to={"/"}
        className="lg:text-3xl md:text-2xl text-xl font-bold tracking-wider"
      >
        <span className="text-secondary bold">Auto</span> Mechanic
      </Link>

      {!isLessThan && <Nav />}

      <button className="border border-secondary p-4 md:tracking-wider hover:text-secondary text-sm sm:text-base">
        Customers
      </button>
    </div>
  );
}

export default HeaderNav;
