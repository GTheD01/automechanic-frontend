import { cn } from "@/lib/cn";
import { NavLink } from "react-router-dom";

interface CustomNavLinkProps {
  to: string;
  content: string;
  className?: string;
}

function CustomNavLink({ to, content, className }: CustomNavLinkProps) {
  return (
    <NavLink
      className={({ isActive }) =>
        cn("hover:bg-gray-200/30", isActive && "bg-gray-200/10", className)
      }
      to={to}
    >
      {content}
    </NavLink>
  );
}

export default CustomNavLink;
