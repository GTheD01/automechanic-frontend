import { Dispatch } from "react";

import { MenuItem } from "@/pages/UserProfile/UserProfile";
import SubMenuItem from "@/pages/UserProfile/components/SubMenuItem";

interface SubMenuProps {
  subMenuItems: MenuItem[];
  selectedMenuItem: MenuItem;
  onSelectMenuItem: Dispatch<MenuItem>;
}

function SubMenu({
  subMenuItems,
  selectedMenuItem,
  onSelectMenuItem,
}: SubMenuProps) {
  return (
    <menu className="py-4 bg-secondary text-white">
      <ul className="flex justify-around items-center">
        {subMenuItems.map((item, index) => (
          <SubMenuItem
            menuItem={item}
            key={index}
            to={item.toLowerCase()}
            selectedMenuItem={selectedMenuItem}
            onClick={() => onSelectMenuItem(item)}
          />
        ))}
      </ul>
    </menu>
  );
}

export default SubMenu;
