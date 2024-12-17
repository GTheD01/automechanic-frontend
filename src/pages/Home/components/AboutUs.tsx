import heroSectionImage from "@/assets/images/hero-section-image.webp";

function AboutUs() {
  return (
    <section
      id="about-us"
      className="lg:flex gap-16 md:px-28 sm:px-16 px-4 pt-36"
    >
      <div
        className="relative flex gap-8 flex-col items-start mb-4 
        bg-cover bg-top p-28 before:absolute before:inset-0 before:bg-black/75 *:z-10 text-white"
        style={{ backgroundImage: `url(${heroSectionImage})` }}
      >
        <h2 className="text-4xl font-semibold">About Us</h2>
        <p className="sm:text-base text-sm">
          Choose our auto service center for expert technicians committed to
          keeping your vehicle in top condition. We use high-quality parts and
          advanced diagnostic tools to ensure the best service, with transparent
          pricing and outstanding customer care. Our goal is to exceed your
          expectations every time you visit.
        </p>
        <a
          href="#contact"
          className="bg-secondary px-6 py-3 hover:bg-secondaryHover md:text-xl cursor-pointer"
        >
          Contact Us
        </a>
      </div>
    </section>
  );
}

export default AboutUs;
