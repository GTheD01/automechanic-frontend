import { Link } from "react-router-dom";

function HeaderNav() {
  return (
    <div className="flex gap-4 items-center justify-between py-8 lg:px-28 px-2 border-b border-gray-500 bg-primary">
      <Link
        to={"/"}
        className="lg:text-3xl md:text-2xl text-xl font-bold tracking-wider"
      >
        <span className="text-secondary bold">Auto</span> Mechanic
      </Link>

      <nav className="flex gap-5 *:tracking-wide *:text-sm *:sm:text-base">
        <a
          href="#home"
          className="border-b-2 border-transparent hover:border-b hover:border-secondary"
        >
          Home
        </a>
        <a
          href="#services"
          className="border-b-2 border-transparent hover:border-b hover:border-secondary"
        >
          Services
        </a>
        <a
          href="#about-us"
          className="border-b-2 border-transparent hover:border-b hover:border-secondary"
        >
          About Us
        </a>

        <a
          href="#contact"
          className="border-b-2 border-transparent hover:border-b hover:border-secondary"
        >
          Contact
        </a>
      </nav>

      <button className="border border-secondary p-4 md:tracking-wider hover:text-secondary text-sm sm:text-base">
        Customers
      </button>
    </div>
  );
}

export default HeaderNav;
