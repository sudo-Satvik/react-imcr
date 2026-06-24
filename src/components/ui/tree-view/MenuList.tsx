import MenuItem from "./MenuItem";

const MenuList = ({ menu }) => {
  return (
    <ul className="ml-10 text-md font-semibold text-white">
      {menu && menu.length > 0
        ? menu.map((item) => <MenuItem key={item} menuData={item} />)
        : null}
    </ul>
  );
};

export default MenuList;
