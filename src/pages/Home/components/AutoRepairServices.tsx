import engineMaintenanceImg from "@/assets/images/engine-maintenance.webp";
import brakeRepairImg from "@/assets/images/brake-repair.webp";
import airConditioningImg from "@/assets/images/air-conditioning-service.webp";
import glassRepairImg from "@/assets/images/auto-glass-repair.webp";
import RepairServiceCard from "@/components/RepairServiceCard";
import { Link } from "react-router-dom";

function AutoRepairServices() {
  return (
    <section className="text-neutral sm:px-28 px-4">
      <div className="flex justify-between gap-2">
        <h2 className="lg:text-5xl md:text-3xl text-2xl text-primary font-medium">
          Our Auto Repair Services
        </h2>
        <Link
          to="/customers/sign-up"
          className="bg-secondary text-white px-8 py-4 hover:bg-secondaryHover md:text-base text-sm text-center font-bold"
        >
          Become Our Customer
        </Link>
      </div>
      <p className="text-primary max-w-[65%] mt-8 sm:text-base text-sm">
        At our auto repair center, we offer a comprehensive range of services to
        keep your vehicle running smoothly. Our expert technicians are here to
        diagnose and solve any issues with your car, providing you with the
        highest quality service and peace of mind.
      </p>
      <div className="grid lg:grid-cols-4 md:grid-cols-2 gap-4 mt-12">
        <RepairServiceCard
          img={engineMaintenanceImg}
          alt="Man putting oil into the car's engine"
          header="Engine Maintenance"
          text="Our Engine Tune-Up service is tailored to keep your engine running at its best. 
          Using advanced diagnostic tools, our skilled technicians identify and resolve any issues for optimal performance."
        />
        <RepairServiceCard
          img={brakeRepairImg}
          alt="Man repairing car brakes"
          header="Brake System Repaire"
          text="Engineered to ensure your vehicle’s safety, this service addresses all aspects of your brake system. 
          Expert technicians use advanced diagnostic tools to detect and fix any issues, ensuring optimal braking performance."
        />
        <RepairServiceCard
          img={airConditioningImg}
          alt="Replacing fluid"
          header="Air Conditioning Service"
          text="Designed to keep your vehicle's climate control system functioning at its best, this service ensures optimal cooling performance. 
          Expert technicians use advanced tools to diagnose and resolve any issues with your air conditioning system."
        />
        <RepairServiceCard
          img={glassRepairImg}
          alt="Replacing glass"
          header="Auto Glass Services"
          text="Specialized to ensure your vehicle’s glass is in top condition, this service addresses any cracks or damage. 
          Skilled technicians use advanced tools to repair or replace auto glass, ensuring safety and clarity."
        />
      </div>
    </section>
  );
}

export default AutoRepairServices;
