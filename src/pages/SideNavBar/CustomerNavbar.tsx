import CustomNavLink from "@/components/CustomNavLink";

function CustomerNavbar() {
  return (
    <>
      <h2 className="font-semibold uppercase tracking-wide mb-8 p-8 border-b-2">
        Customer Dashboard
      </h2>
      <ul className="flex flex-col">
        <CustomNavLink to="/dashboard" content="Dashboard" />
        <CustomNavLink to="/my-cars" content="My Cars" />
        <CustomNavLink to="/my-appointments" content="My Appointments" />
        <CustomNavLink to="/reports" content="Reports" />
      </ul>
    </>
  );
}

export default CustomerNavbar;
