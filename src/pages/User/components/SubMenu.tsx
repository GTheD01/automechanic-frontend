import SubMenuItem from "./SubMenuItem";
import { MenuItem } from "../User";

interface SubMenuProps {
  subMenuItems: MenuItem[];
}

function SubMenu({ subMenuItems }: SubMenuProps) {
  return (
    <menu className="py-4 bg-secondary text-white">
      <ul className="flex justify-around items-center">
        {subMenuItems.map((item, index) => (
          <SubMenuItem key={index} to={item.toLowerCase()}>
            {item}
          </SubMenuItem>
        ))}
      </ul>
    </menu>
  );
}

export default SubMenu;
