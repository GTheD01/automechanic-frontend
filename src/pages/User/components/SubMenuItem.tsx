import { cn } from "@/lib/cn";
import { MenuItem } from "@/pages/User/User";

interface SubMenuItemProps extends React.HTMLProps<HTMLLIElement> {
  menuItem: MenuItem;
  to: string;
  selectedMenuItem: MenuItem;
}

function SubMenuItem({
  menuItem,
  selectedMenuItem,
  ...props
}: SubMenuItemProps) {
  let activeClasses;

  if (selectedMenuItem === menuItem) {
    activeClasses =
      "after:absolute after:bg-white after:w-full after:h-[2px] after:bottom-0 after:left-0 after:transition-all after:duration-300 after:ease-in-out before:absolute before:bg-white before:w-full before:h-[2px] before:top-0 before:right-0 before:transition-all before:duration-300 before:ease-in-out";
  } else {
    activeClasses =
      "after:absolute after:bg-white after:w-0 after:h-[2px] after:bottom-0 after:left-0 after:transition-all after:duration-300 after:ease-in-out before:absolute before:bg-white before:w-0 before:h-[2px] before:top-0 before:right-0 before:transition-all before:duration-300 before:ease-in-out";
  }
  return (
    <li
      aria-label={menuItem}
      aria-selected={selectedMenuItem === menuItem}
      role="menuitem"
      className={cn(
        "hover:text-neutral relative transition cursor-pointer",
        activeClasses
      )}
      {...props}
    >
      {menuItem}
    </li>
  );
}

export default SubMenuItem;
