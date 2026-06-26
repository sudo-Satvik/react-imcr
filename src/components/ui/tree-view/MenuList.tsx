import MenuItem, { MenuNode } from "./MenuItem";

interface MenuListProps {
  menu: MenuNode[];
}

const MenuList = ({ menu }: MenuListProps) => {
  return (
    <ul className="ml-10 text-md font-semibold text-white">
      {menu && menu.length > 0
        ? menu.map((item) => <MenuItem key={item.label} menuData={item} />)
        : null}
    </ul>
  );
};

export default MenuList;
