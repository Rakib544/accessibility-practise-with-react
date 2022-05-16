import * as React from "react";
import { MenubarContext } from "../../contexts/menubar";

function PracticeMenuItem({ children, ...props }) {
  const menubarContext = React.useContext(MenubarContext);
  if (!menubarContext) {
    throw Error("MenuItem must be used within a Menubar Context");
  }

  const [isFirstChild, setIsFirstChild] = React.useState(false);

  const menuItemRef = React.useRef(null);

  const { menuItems } = menubarContext;

  const listItemProps = {
    ...props,
    ref: menuItemRef,
    "data-menubar-listitem": "",
    role: "none",
  };

  const childProps = {
    "data-menubar-menuitem": "",
    role: "menuitem",
    tabIndex: isFirstChild ? "0" : "-1",
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

  return <li {...listItemProps}>{React.cloneElement(children, childProps)}</li>;
}

export default PracticeMenuItem;
