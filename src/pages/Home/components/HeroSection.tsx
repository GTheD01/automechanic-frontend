import heroSectionImage from "@/assets/images/hero-section-image.webp";

function HeroSection() {
  return (
    <main
      id="home"
      className="xl:flex relative gap-8 pt-16 border-b border-gray-500 sm:px-48 px-2 bg-primary bg-cover bg-center before:absolute before:inset-0 before:bg-black/75 *:z-10"
      style={{ backgroundImage: `url(${heroSectionImage})` }}
    >
      <div className="space-y-8 pb-8 relative">
        <h1 className="lg:text-4xl md:text-3xl sm:text-2xl  font-bold">
          Optimize Your Vehicle's Performance with Our Auto Service
        </h1>
        <p className="text-neutral font-light text-sm md:text-base">
          At our auto service center, we offer a range of services designed to
          keep your vehicle running at its best. From routine maintenance to
          complex repairs, We're here to help you achieve optimal performance
          and reliability.
        </p>
        <p>
          <a
            href="#contact"
            className="bg-secondary px-12 py-4 tracking-wider lg:text-lg md:text-base text-sm hover:bg-secondaryHover cursor-pointer font-bold"
          >
            Contact Us
          </a>
        </p>
        <div className="flex gap-8">
          <div className="border-r border-gray-500 sm:pr-8">
            <p className="lg:text-2xl md:text-xl text-lg">543+</p>
            <p className="text-neutral lg:text-lg md:text-base text-sm font-light">
              Projects Completed
            </p>
          </div>
          <div className="border-r border-gray-500 sm:pr-8">
            <p className="lg:text-2xl md:text-xl text-lg">98%</p>
            <p className="text-neutral lg:text-lg md:text-base text-sm font-light">
              Clients Satisfaction
            </p>
          </div>
          <div>
            <p className="lg:text-2xl md:text-xl text-lg">36+</p>
            <p className="text-neutral lg:text-lg md:text-base text-sm font-light">
              Expert Technicians
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}

export default HeroSection;
