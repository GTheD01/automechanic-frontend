import AboutUs from "./components/AboutUs";
import AutoRepairServices from "./components/AutoRepairServices";
import ContactUs from "./components/ContactUs";
import CustomerReviews from "./components/CustomerReviews";
import HeroSection from "./components/HeroSection";
import WhyChooseUsSection from "./components/WhyChooseUsSection";

function Home() {
  return (
    <>
      <HeroSection />
      <WhyChooseUsSection />
      <AutoRepairServices />
      <AboutUs />
      <ContactUs />
      <CustomerReviews />
    </>
  );
}

export default Home;
