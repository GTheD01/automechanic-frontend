import AboutUs from "../components/AboutUs";
import AutoRepairServices from "../components/AutoRepairServices";
import CustomerReviews from "../components/CustomerReviews";
import Header from "../components/HeaderNav";
import HeroSection from "../components/HeroSection";
import WhyChooseUsSection from "../components/WhyChooseUsSection";

function Home() {
  return (
    <>
      <Header />
      <HeroSection />
      <WhyChooseUsSection />
      <AutoRepairServices />
      <AboutUs />
      <CustomerReviews />
    </>
  );
}

export default Home;
