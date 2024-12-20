function Nav() {
  return (
    <nav className="flex gap-8 *:tracking-wide *:text-sm *:sm:text-base">
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
  );
}

export default Nav;
