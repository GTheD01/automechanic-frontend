import heroSectionImage from "../assets/images/hero-section-image.webp";

function AboutUs() {
  return (
    <section id="about-us" className="lg:flex gap-16 sm:px-28 px-4 pt-36">
      <div className="flex gap-8 flex-col items-start justify-start text-primary lg:w-1/2 mb-4">
        <h2 className="text-4xl font-semibold">About Us</h2>
        <p className="sm:text-base text-sm">
          Choosing our auto service center means choosing a team of highly
          skilled and experienced technicians dedicated to providing the best
          possible service for your vehicle. We pride ourselves on our
          commitment to quality, using only the highest quality parts and
          cutting-edge diagnostic tools to keep your car running at its best.
          With transparent pricing and exceptional customer service, we strive
          to exceed your expectations every time you visit us." Choosing our
          auto service center means choosing a team of highly skilled and
          experienced technicians dedicated to providing the best possible
          service for your vehicle. We pride ourselves on our commitment to
          quality, using only the highest quality parts and cutting-edge
          diagnostic tools to keep your car running at its best.
        </p>
        <a
          href="#contact"
          className="bg-secondary px-6 py-3 hover:bg-secondaryHover text-white md:text-xl cursor-pointer"
        >
          Contact Us
        </a>
      </div>
      <div className="lg:w-1/2">
        <img src={heroSectionImage} className="w-full h-full" />
      </div>
    </section>
  );
}

export default AboutUs;
