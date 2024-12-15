import engineMaintenanceImg from "../assets/images/engine-maintenance.jpeg";
import brakeRepairImg from "../assets/images/brake-repair.jpeg";
import airConditioningImg from "../assets/images/air-conditioning-service.jpeg";
import glassRepairImg from "../assets/images/auto-glass-repair.jpeg";
import RepairServiceCard from "./RepairServiceCard";

function AutoRepairServices() {
  return (
    <div className="text-neutral px-28">
      <div className="flex justify-between">
        <h2 className="text-5xl text-primary font-medium">
          Our Auto Repair Services
        </h2>
        <button className="bg-secondary text-white px-8 py-4 hover:bg-secondaryHover">
          Call Us Now
        </button>
      </div>
      <p className="text-primary max-w-[65%] mt-8">
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
          text="Our Engine Tune-Up service is designed to keep your engine running
              smoothly and efficiently. Our expert technicians use advanced
              diagnostic tools to identify and correct any issues with your
              engine."
        />
        <RepairServiceCard
          img={brakeRepairImg}
          alt="Man repairing car brakes"
          header="Brake System Repaire"
          text="Our Engine Tune-Up service is designed to keep your engine running
              smoothly and efficiently. Our expert technicians use advanced
              diagnostic tools to identify and correct any issues with your
              engine."
        />
        <RepairServiceCard
          img={airConditioningImg}
          alt="Replacing fluid"
          header="Air Conditioning Service"
          text="Our Engine Tune-Up service is designed to keep your engine running
              smoothly and efficiently. Our expert technicians use advanced
              diagnostic tools to identify and correct any issues with your
              engine."
        />
        <RepairServiceCard
          img={glassRepairImg}
          alt="Replacing glass"
          header="Auto Glass Services"
          text="Our Engine Tune-Up service is designed to keep your engine running
              smoothly and efficiently. Our expert technicians use advanced
              diagnostic tools to identify and correct any issues with your
              engine."
        />
      </div>
    </div>
  );
}

export default AutoRepairServices;
