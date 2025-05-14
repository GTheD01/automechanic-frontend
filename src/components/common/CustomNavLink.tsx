import { ReactNode } from "react";
import { NavLink } from "react-router-dom";

import { cn } from "@/lib/cn";

interface CustomNavLinkProps {
  to: string;
  children: ReactNode;
  className?: string;
}

function CustomNavLink({ to, children, className }: CustomNavLinkProps) {
  return (
    <NavLink
      className={({ isActive }) =>
        cn("hover:bg-gray-200/30", isActive && "bg-gray-200/10", className)
      }
      to={to}
    >
      {children}
    </NavLink>
  );
}

export default CustomNavLink;
