import { ReactNode } from "react";
import { NavLink } from "react-router-dom";

import { cn } from "@/lib/cn";

interface SubMenuItemProps {
  children: ReactNode;
  to: string;
}

function SubMenuItem({ children, to }: SubMenuItemProps) {
  // TODO: Change NavLink to prevent re-renders of the ProtectedPagesLayout
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        cn(
          "hover:text-neutral relative transition",
          isActive
            ? "after:absolute after:bg-white after:w-full after:h-[2px] after:bottom-0 after:left-0 after:transition-all after:duration-300 after:ease-in-out before:absolute before:bg-white before:w-full before:h-[2px] before:top-0 before:right-0 before:transition-all before:duration-300 before:ease-in-out"
            : "after:absolute after:bg-white after:w-0 after:h-[2px] after:bottom-0 after:left-0 after:transition-all after:duration-300 after:ease-in-out before:absolute before:bg-white before:w-0 before:h-[2px] before:top-0 before:right-0 before:transition-all before:duration-300 before:ease-in-out"
        )
      }
    >
      {children}
    </NavLink>
  );
}

export default SubMenuItem;
