import heroSectionImage from "@/assets/images/hero-section-image.webp";

function HeroSection() {
  return (
    <main
      id="home"
      className="xl:flex relative gap-8 pt-16 border-b border-gray-500 lg:px-40 md:px-28 sm:px-20 px-2 bg-primary bg-cover bg-center before:absolute before:inset-0 before:bg-black/75 *:z-10"
      style={{ backgroundImage: `url(${heroSectionImage})` }}
    >
      <div className="space-y-8 pb-8 relative lg:w-2/3">
        <h1 className="lg:text-4xl md:text-3xl sm:text-2xl  font-bold">
          Enhance Your Vehicle's Performance with Expert Auto Services
        </h1>
        <p className="text-neutral font-light text-sm md:text-base">
          At our auto service center, we provide a comprehensive range of
          services to ensure your vehicle performs at its peak. Whether it's
          routine maintenance or intricate repairs, we're dedicated to
          delivering the reliability and performance your car deserves.
        </p>
        <p>
          <a
            href="#contact"
            className="bg-secondary px-12 py-4 tracking-wider lg:text-lg md:text-base text-sm hover:bg-secondaryHover cursor-pointer font-bold"
          >
            Contact Us
          </a>
        </p>
        <div className="flex">
          <div className="border-r border-gray-500 pr-2">
            <p className="lg:text-2xl md:text-xl text-lg">1000+</p>
            <p className="text-neutral lg:text-lg md:text-base text-sm font-light">
              Happy Customers
            </p>
          </div>
          <div className="border-r border-gray-500 px-2">
            <p className="lg:text-2xl md:text-xl text-lg">95%</p>
            <p className="text-neutral lg:text-lg md:text-base text-sm font-light">
              Service Excellence Rate
            </p>
          </div>
          <div className="pl-2">
            <p className="lg:text-2xl md:text-xl text-lg">15+</p>
            <p className="text-neutral lg:text-lg md:text-base text-sm font-light">
              Years in the Industry
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}

export default HeroSection;
