import heroSectionImage from "@/assets/images/hero-section-image.webp";

function HeroSection() {
  return (
    <main
      id="home"
      className="lg:grid lg:grid-cols-2 gap-20 pt-16 border-b border-gray-500 sm:px-28 px-2 bg-primary"
    >
      <div className="space-y-8 pb-8">
        <h1 className="lg:text-4xl md:text-3xl sm:text-2xl  font-bold">
          Optimize Your Vehicle's Performance with Our Auto Service
        </h1>
        <p className="text-neutral font-light text-sm md:text-base lg:text-lg">
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
            <p className="lg:text-4xl md:text-2xl text-xl">543+</p>
            <p className="text-neutral lg:text-lg md:text-base text-sm font-light">
              Projects Completed
            </p>
          </div>
          <div className="border-r border-gray-500 sm:pr-8">
            <p className="lg:text-4xl md:text-2xl text-xl">98%</p>
            <p className="text-neutral lg:text-lg md:text-base text-sm font-light">
              Clients Satisfaction
            </p>
          </div>
          <div>
            <p className="lg:text-4xl md:text-2xl text-xl">36+</p>
            <p className="text-neutral lg:text-lg md:text-base text-sm font-light">
              Expert Technicians
            </p>
          </div>
        </div>
      </div>
      <div>
        <img
          loading="lazy"
          src={heroSectionImage}
          className="h-full w-full"
          alt="Worker doing service"
        />
      </div>
    </main>
  );
}

export default HeroSection;
