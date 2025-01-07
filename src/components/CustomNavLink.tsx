import { cn } from "@/lib/cn";
import { NavLink } from "react-router-dom";

interface CustomNavLinkProps {
  to: string;
  content: string;
}

function CustomNavLink({ to, content }: CustomNavLinkProps) {
  return (
    <NavLink
      className={({ isActive }) =>
        cn("pl-8 py-4 hover:bg-gray-200/30", isActive && "bg-gray-200/10")
      }
      to={to}
    >
      {content}
    </NavLink>
  );
}

export default CustomNavLink;
