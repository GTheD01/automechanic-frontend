import CustomNavLink from "@/components/CustomNavLink";

import CarIcon from "@/assets/svgs/car.svg";
import UsersIcon from "@/assets/svgs/users.svg";
import ReportsIcon from "@/assets/svgs/reports.svg";
import DashboardIcon from "@/assets/svgs/dashboard.svg";
import AppointmentsIcon from "@/assets/svgs/appointments.svg";

function AdminNavbar() {
  return (
    <>
      <h2 className="font-semibold uppercase tracking-wide mb-8 p-4 sm:p-6 border-b-2 text-sm sm:text-base lg:text-xl">
        <span className="hidden sm:block">Admin Dashboard</span>
        <img
          src="/automechanic.svg"
          alt="Automechanic logo"
          className="sm:hidden"
        />
      </h2>
      <ul className="flex flex-col">
        <CustomNavLink
          to="/dashboard"
          className="pl-4 py-2 sm:pl-6 sm:py-3 md:pl-8 md:py-4 text-sm md:text-base"
        >
          <span className="hidden sm:block">Dashboard</span>
          <img
            src={DashboardIcon}
            alt="Dashboard Icon"
            className="w-6 h-6 sm:hidden"
          />
        </CustomNavLink>
        <CustomNavLink
          to="/users"
          className="pl-4 py-2 sm:pl-6 sm:py-3 md:pl-8 md:py-4 text-sm md:text-base"
        >
          <span className="hidden sm:block">Users</span>
          <img src={UsersIcon} alt="Users Icon" className="w-6 h-6 sm:hidden" />
        </CustomNavLink>
        <CustomNavLink
          to="/appointments"
          className="pl-4 py-2 sm:pl-6 sm:py-3 md:pl-8 md:py-4 text-sm md:text-base"
        >
          <span className="hidden sm:block">Appointments</span>
          <img
            src={AppointmentsIcon}
            alt="Appointments Icon"
            className="w-6 h-6 sm:hidden"
          />
        </CustomNavLink>
        <CustomNavLink
          to="/reports"
          className="pl-4 py-2 sm:pl-6 sm:py-3 md:pl-8 md:py-4 text-sm md:text-base"
        >
          <span className="hidden sm:block">Reports</span>
          <img
            src={ReportsIcon}
            alt="Reports Icon"
            className="w-6 h-6 sm:hidden"
          />
        </CustomNavLink>
        <CustomNavLink
          to="/car-brands"
          className="pl-4 py-2 sm:pl-6 sm:py-3 md:pl-8 md:py-4 text-sm md:text-base"
        >
          <span className="hidden sm:block">Car Brands</span>
          <img src={CarIcon} alt="Reports Icon" className="w-6 h-6 sm:hidden" />
        </CustomNavLink>
        <CustomNavLink
          to="/car-models"
          className="pl-4 py-2 sm:pl-6 sm:py-3 md:pl-8 md:py-4 text-sm md:text-base"
        >
          <span className="hidden sm:block">Car Models</span>
          <img src={CarIcon} alt="Reports Icon" className="w-6 h-6 sm:hidden" />
        </CustomNavLink>
      </ul>
    </>
  );
}

export default AdminNavbar;
