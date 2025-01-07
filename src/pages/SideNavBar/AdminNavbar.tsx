import { NavLink } from "react-router-dom";

import { cn } from "@/lib/cn";

function AdminNavbar() {
  return (
    <nav className="bg-primary w-1/5 h-full min-w-40">
      <h2 className="font-semibold uppercase tracking-wide mb-8 p-8">
        Admin Dashboard
      </h2>
      <ul className="flex flex-col">
        <NavLink
          className={({ isActive }) =>
            cn("pl-8 py-4 hover:bg-gray-200/30", isActive && "bg-gray-200/10")
          }
          to="/dashboard"
        >
          Dashboard
        </NavLink>
        <NavLink
          className={({ isActive }) =>
            cn("pl-8 py-4 hover:bg-gray-200/30", isActive && "bg-gray-200/10")
          }
          to="/users"
        >
          Users
        </NavLink>
        <NavLink
          className={({ isActive }) =>
            cn("pl-8 py-4 hover:bg-gray-200/30", isActive && "bg-gray-200/10")
          }
          to="/appointments"
        >
          Appointments
        </NavLink>
        <NavLink
          className={({ isActive }) =>
            cn("pl-8 py-4 hover:bg-gray-200/30", isActive && "bg-gray-200/10")
          }
          to="/reports"
        >
          Reports
        </NavLink>
      </ul>
    </nav>
  );
}

export default AdminNavbar;
