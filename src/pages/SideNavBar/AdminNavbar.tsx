import CustomNavLink from "@/components/CustomNavLink";

function AdminNavbar() {
  return (
    <nav className="bg-primary w-1/5 h-full min-w-40">
      <h2 className="font-semibold uppercase tracking-wide mb-8 p-8">
        Admin Dashboard
      </h2>
      <ul className="flex flex-col">
        <CustomNavLink to="/dashboard" content="Dashboard" />
        <CustomNavLink to="/users" content="Users" />
        <CustomNavLink to="/appointments" content="Appointments" />
        <CustomNavLink to="/reports" content="Reports" />
      </ul>
    </nav>
  );
}

export default AdminNavbar;
