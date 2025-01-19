import AboutUs from "@/pages/Home/components/AboutUs";
import AutoRepairServices from "@/pages/Home/components/AutoRepairServices";
import ContactUs from "@/pages/Home/components/ContactUs";
import CustomerReviews from "@/pages/Home/components/CustomerReviews";
import HeroSection from "@/pages/Home/components/HeroSection";
import WhyChooseUsSection from "@/pages/Home/components/WhyChooseUsSection";

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
