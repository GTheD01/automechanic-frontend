import { Link } from "react-router-dom";

function Header() {
  return (
    <div className="flex items-center justify-between py-8 px-28 border-b border-gray-500 bg-primary">
      <Link to={"/"} className="text-3xl font-bold tracking-wider">
        <span className="text-secondary bold">Auto</span> Mechanic
      </Link>

      <nav className="flex gap-8 *:tracking-wide">
        <Link
          to=""
          className="active:border-b active:border-secondary hover:border-b hover:border-secondary"
        >
          Home
        </Link>
        <Link
          to="#about-us"
          className="active:border-b active:border-secondary hover:border-b hover:border-secondary"
        >
          About Us
        </Link>
        <Link
          to="#services"
          className="active:border-b active:border-secondary hover:border-b hover:border-secondary"
        >
          Services
        </Link>
        <Link
          to="#contact"
          className="active:border-b active:border-secondary hover:border-b hover:border-secondary"
        >
          Contact
        </Link>
      </nav>

      <button className="border border-secondary p-4 tracking-wider hover:text-secondary">
        Become our Customer
      </button>
    </div>
  );
}

export default Header;
