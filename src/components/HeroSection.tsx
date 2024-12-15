import heroSectionImage from "../assets/images/hero-section-image.webp";

function HeroSection() {
  return (
    <main className="lg:grid lg:grid-cols-2 gap-20 pt-36 border-b border-gray-500 px-28 bg-primary">
      <div className="space-y-8 pb-8">
        <h1 className="text-5xl font-bold">
          Optimize Your Vehicle's Performance with Our Auto Service
        </h1>
        <p className="text-neutral font-light">
          At our auto service center, we offer a range of services designed to
          keep your vehicle running at its best. From routine maintenance to
          complex repairs, We're here to help you achieve optimal performance
          and reliability.
        </p>
        <button className="bg-secondary px-12 py-4 tracking-wider text-lg hover:bg-secondaryHover">
          Request A Quote
        </button>
        <div className="flex gap-8">
          <div className="border-r border-gray-500 pr-8">
            <p className="text-4xl">543+</p>
            <p className="text-neutral text-lg font-light">
              Projects Completed
            </p>
          </div>
          <div className="border-r border-gray-500 pr-8">
            <p className="text-4xl">98%</p>
            <p className="text-neutral text-lg font-light">
              Clients Satisfaction
            </p>
          </div>
          <div>
            <p className="text-4xl">36+</p>
            <p className="text-neutral text-lg font-light">
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
