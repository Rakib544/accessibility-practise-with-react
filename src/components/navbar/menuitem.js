/* eslint-disable no-unused-expressions */
import * as React from "react";
import { MenubarContext, SubmenuContext } from "../../contexts/menubar";

const MenuItem = ({ children, ...props }) => {
  const menubarContext = React.useContext(MenubarContext);
  const submenuContext = React.useContext(SubmenuContext);

  if (!menubarContext && !submenuContext) {
    throw new Error(
      "MenuItem must be used within either a Menubar or Submenu Context"
    );
  }

  const [isFirstChild, setIsFirstChild] = React.useState(false);
  const menuItemRef = React.useRef(null);
  const { menuItems } = submenuContext || menubarContext;

  const listItemProps = {
    ...props,
    ref: menuItemRef,
    role: "none",
    "data-menubar-listitem": !submenuContext ? "" : null,
    "data-menubar-submenu-listitem": submenuContext ? "" : null,
  };

  const childProps = {
    role: "menuitem",
    tabIndex: !submenuContext && isFirstChild ? "0" : "-1",
    "data-menubar-menuitem": !submenuContext ? "" : null,
    "data-menubar-submenu-menuitem": submenuContext ? "" : null,
  };

  React.useEffect(() => {
    const menuItemNode = menuItemRef.current;

    if (menuItemNode) {
      if (!menuItems.size) {
        setIsFirstChild(true);
      }

      menuItems.add(menuItemNode);
    }

    return () => {
      menuItems.delete(menuItemNode);
    };
  }, [menuItems]);

  return (
    <li {...listItemProps}>
      {typeof children === "function"
        ? children(childProps)
        : React.cloneElement(children, childProps)}
    </li>
  );
};

export default MenuItem;
