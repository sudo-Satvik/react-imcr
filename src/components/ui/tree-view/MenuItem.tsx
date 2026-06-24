import { useState } from "react";

interface MenuNode {
  id: string;
  label: string;
  children?: MenuNode[];
}

interface Props {
  menuData: MenuNode;
}

const MenuItem = ({ menuData }: Props) => {
  const [isOpen, setIsOpen] = useState(false);

  const hasChildren = menuData.children?.length > 0;

  return (
    <li className="my-2">
      <button
        className="cursor-pointer"
        onClick={() => {
          if (hasChildren) {
            setIsOpen((prev) => !prev);
          }
        }}
        aria-expanded={isOpen}
      >
        {menuData.label}
        {hasChildren && (isOpen ? " -" : " +")}
      </button>

      {isOpen && hasChildren && (
        <ul className="ml-8">
          {menuData.children!.map((child) => (
            <MenuItem key={child.id} menuData={child} />
          ))}
        </ul>
      )}
    </li>
  );
};

export default MenuItem;
