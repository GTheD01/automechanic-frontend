import expertDiagnosticsIcon from "@/assets/svgs/expert-diagnostics.svg";
import varietyOfServicesIcon from "@/assets/svgs/variety-of-services.svg";
import toolsIcon from "@/assets/svgs/tools.svg";
import WhyChooseUsCard from "@/components/WhyChooseUsCard";

function WhyChooseUsSection() {
  return (
    <section>
      <div className="pt-28 bg-primary">
        <h2
          id="services"
          className="lg:text-4xl md:text-3xl text-2xl sm:pl-28 pl-2 pb-28 w-4/5"
        >
          Driven by 24+ Years of Expertise, Delivering Excellence in Every
          Service
        </h2>
      </div>
      <div className="sm:pr-28 sm:pl-52 lg:pl-28 px-4 lg:pr-20">
        <div className="lg:flex lg:items-start space-y-4 lg:space-y-0 gap-16 bg-sky-50 text-black px-16 py-20 -translate-y-14">
          <WhyChooseUsCard
            alt="computer with car on the screen"
            img={expertDiagnosticsIcon}
            header="Expert Diagnostics"
            text="With more than 24 years of experience, our skilled technicians have handled and resolved a wide range of automotive issues. 
            This expertise allows us to swiftly and precisely identify any problems with your vehicle."
          />
          <WhyChooseUsCard
            alt="tree branches"
            img={varietyOfServicesIcon}
            header="Variety of Services"
            text="From routine maintenance like oil changes to complex repairs such as engine overhauls and transmission replacements, 
            our extensive service offerings meet all your car care needs."
          />
          <WhyChooseUsCard
            alt="tools"
            img={toolsIcon}
            header="Advanced Equipment"
            text="We continuously invest in the latest tools and technologies to deliver top-quality service. 
            Using cutting-edge equipment, we ensure your vehicle stays in optimal condition."
          />
        </div>
      </div>
    </section>
  );
}

export default WhyChooseUsSection;
