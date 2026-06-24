import Wrapper from "../../other/Wrapper";
import menus from "./data";
import MenuList from "./MenuList";

const TreeView = () => {
  return (
    <Wrapper bgColor="bg-blue-200">
      <aside className="min-h-screen bg-blue-950 w-150 absolute left-0">
        <MenuList menu={menus} />
      </aside>
    </Wrapper>
  );
};

export default TreeView;
