import CustomNavLink from "@/components/CustomNavLink";

function AdminNavbar() {
  return (
    <>
      <h2 className="font-semibold uppercase tracking-wide mb-8 p-4 sm:p-6 border-b-2 text-sm sm:text-base lg:text-xl">
        Admin Dashboard
      </h2>
      <ul className="flex flex-col">
        <CustomNavLink
          to="/dashboard"
          content="Dashboard"
          className="pl-4 py-2 sm:pl-6 sm:py-3 md:pl-8 md:py-4 text-sm md:text-base"
        />
        <CustomNavLink
          to="/users"
          content="Users"
          className="pl-4 py-2 sm:pl-6 sm:py-3 md:pl-8 md:py-4 text-sm md:text-base"
        />
        <CustomNavLink
          to="/appointments"
          content="Appointments"
          className="pl-4 py-2 sm:pl-6 sm:py-3 md:pl-8 md:py-4 text-sm md:text-base"
        />
        <CustomNavLink
          to="/reports"
          content="Reports"
          className="pl-4 py-2 sm:pl-6 sm:py-3 md:pl-8 md:py-4 text-sm md:text-base"
        />
      </ul>
    </>
  );
}

export default AdminNavbar;
