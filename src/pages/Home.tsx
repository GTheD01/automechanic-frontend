import AboutUs from "../components/AboutUs";
import AutoRepairServices from "../components/AutoRepairServices";
import CustomerReviews from "../components/CustomerReviews";
import Footer from "../components/Footer";
import HeaderNav from "../components/HeaderNav";
import HeroSection from "../components/HeroSection";
import WhyChooseUsSection from "../components/WhyChooseUsSection";

function Home() {
  return (
    <>
      <HeaderNav />
      <HeroSection />
      <WhyChooseUsSection />
      <AutoRepairServices />
      <AboutUs />
      <CustomerReviews />
      <Footer />
    </>
  );
}

export default Home;
