import expertDiagnosticsIcon from "../assets/svgs/expert-diagnostics.svg";
import varietyOfServicesIcon from "../assets/svgs/variety-of-services.svg";
import toolsIcon from "../assets/svgs/tools.svg";
import WhyChooseUsCard from "../components/WhyChooseUsCard";

function WhyChooseUsSection() {
  return (
    <section>
      <div className="pt-36 bg-primary">
        <h2
          id="services"
          className="lg:text-4xl md:text-3xl text-2xl sm:pl-28 pl-2 pb-28 w-4/5"
        >
          Based on our 24+ years of experience we serve you the best
        </h2>
      </div>
      <div className="sm:pr-28 sm:pl-52 lg:pl-28 px-4 lg:pr-20">
        <div className="lg:flex lg:items-start space-y-4 lg:space-y-0 gap-16 bg-sky-50 text-black px-16 py-20 -translate-y-14">
          <WhyChooseUsCard
            alt="computer with car on the screen"
            img={expertDiagnosticsIcon}
            header="Expert Diagnostics"
            text="With over 24 years of experience, our seas oned technicians have
            encountered and solved countless auto issues. This means we can
            quickly and accurately diagnose any problems with your vehicle."
          />
          <WhyChooseUsCard
            alt="tree branches"
            img={varietyOfServicesIcon}
            header="Variety of services"
            text="From routine oil changes and brake repairs to complex engine
            overhauls and transmission replacements, our comprehensive range of
            services has all your car care needs covered."
          />
          <WhyChooseUsCard
            alt="tools"
            img={toolsIcon}
            header="Cutting-Edge Equipment"
            text="We stay up-to-date with the latest tools and technologies to ensure
            that we provide you with the best possible service. We use advanced
            equipment available to keep your car running smoothly."
          />
        </div>
      </div>
    </section>
  );
}

export default WhyChooseUsSection;
