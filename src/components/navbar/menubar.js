/* eslint-disable no-unused-expressions */
import * as React from "react";
import _ from "underscore";
import { MenubarContext } from "../../contexts/menubar";
import { usePrevious } from "../../hooks/usePrevious";
import MenuItem from "./menuitem";
import { Submenu } from "./submenu";

const Menubar = ({ children, direction, onKeyDown, ...props }) => {
  const id = React.useRef(_.uniqueId("menubar--")).current;
  const menuItems = React.useRef(new Set()).current;
  console.log(menuItems);
  const menuRef = React.useRef(null);
  const [currentIndex, setCurrentIndex] = React.useState(0);
  const previousIndex = usePrevious(currentIndex) ?? 0;

  const first = () => setCurrentIndex(0);

  const last = () => setCurrentIndex(menuItems.size - 1);

  const next = () => {
    const index = currentIndex === menuItems.size - 1 ? 0 : currentIndex + 1;
    setCurrentIndex(index);
  };

  const previous = () => {
    const index = currentIndex === 0 ? menuItems.size - 1 : currentIndex - 1;
    setCurrentIndex(index);
  };

  const match = (e) => {
    const items = Array.from(menuItems);

    // Reorder the array, starting with the currentNode
    const reorderedItems = [
      ...items.slice(currentIndex),
      ...items.slice(0, currentIndex),
    ];

    // Find all nodes that begin with the pressed letter
    const matches = reorderedItems.filter((menuItem) => {
      const { textContent } = menuItem.firstChild;
      const firstLetter = textContent.toLowerCase().charAt(0);
      return e.key === firstLetter;
    });

    // Exit early if there are no matches
    if (!matches.length) {
      return;
    }

    // If the focused item is a match, focus the next match.
    // Otherwise, focus the first match
    const currentNode = items[currentIndex];
    const nextMatch = matches.includes(currentNode) ? matches[1] : matches[0];
    const index = items.findIndex((item) => {
      return item === nextMatch;
    });

    setCurrentIndex(index);
  };

  const keyDown = (e) => {
    e.stopPropagation();

    if (direction === "vertical") {
      switch (e.code) {
        case "ArrowUp":
          e.preventDefault();
          previous();
          break;
        case "ArrowDown":
          e.preventDefault();
          next();
          break;
        case "ArrowRight":
          e.preventDefault();
          const isFromSubmenu =
            e.target?.parentNode?.getAttribute(
              "data-menubar-submenu-listitem"
            ) === "";

          if (isFromSubmenu) {
            next();
          }
          break;
        default:
          break;
      }
    }

    if (direction === "horizontal") {
      switch (e.code) {
        case "ArrowLeft":
          e.preventDefault();
          previous(e);
          break;
        case "ArrowRight":
          e.preventDefault();
          next(e);
          break;
        default:
          break;
      }
    }

    switch (e.code) {
      case "End":
        e.preventDefault();
        last();
        break;
      case "Home":
        e.preventDefault();
        first();
        break;
      default:
        match(e);
        break;
    }
  };

  const listProps = {
    ...props,
    id,
    role: "menubar",
    "aria-orientation": direction,
    "data-menubar-list": "",
    onKeyDown: (e) => {
      onKeyDown?.(e);
      keyDown(e);
    },
  };

  React.useEffect(() => {
    if (currentIndex !== previousIndex) {
      const items = Array.from(menuItems);
      const currentNode = items[currentIndex]?.firstChild;
      const previousNode = items[previousIndex]?.firstChild;

      // https://www.w3.org/TR/wai-aria-practices/#kbd_roving_tabindex
      previousNode?.setAttribute("tabindex", "-1");
      currentNode?.setAttribute("tabindex", "0");
      currentNode?.focus();
    }
  }, [currentIndex, previousIndex, menuItems]);

  const value = React.useMemo(
    () => ({ menuItems, direction, menuRef }),
    [menuItems, direction, menuRef]
  );

  return (
    <MenubarContext.Provider value={value}>
      <ul ref={menuRef} className={`menubar ${direction}`} {...listProps}>
        {children}
      </ul>
    </MenubarContext.Provider>
  );
};

Menubar.defaultProps = {
  direction: "horizontal",
};

Menubar.MenuItem = MenuItem;
Menubar.Submenu = Submenu;
Menubar.Submenu.Trigger = Submenu.Trigger;
Menubar.Submenu.List = Submenu.List;

export default Menubar;
