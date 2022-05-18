import * as React from "react";
import { MenubarContext, SubmenuContext } from "../../contexts/menubar";

export const PracticeSubmenuList = ({
  children,
  onClick,
  onKeyDown,
  ...props
}) => {
  const context = React.useContext(SubmenuContext);
  const menubarContext = React.useContext(MenubarContext);

  if (!context || !menubarContext) {
    throw new Error(
      "Submenu.List must be used within a Menubar & Submenu Context"
    );
  }

  const {
    buttonId,
    listId,
    listRef,
    // menuItems,
    // currentIndex,
    isRootMenu,
    isExpanded,
    // move,
    // close,
    // first,
    // last,
  } = context;

  const { direction } = menubarContext;

  //   const previous = () => {
  //     const index = currentIndex === 0 ? menuItems.size - 1 : currentIndex - 1;
  //     move(index);
  //   };

  //   const next = () => {
  //     const index = currentIndex === menuItems.size - 1 ? 0 : currentIndex + 1;
  //     move(index);
  //   };

  //   const match = (e) => {
  //     const items = Array.from(menuItems);

  //     // Reorder the array, starting with the currentNode
  //     const reorderedItems = [
  //       ...items.slice(currentIndex),
  //       ...items.slice(0, currentIndex),
  //     ];

  //     // Find all nodes that begin with the pressed letter
  //     const matches = reorderedItems.filter((menuItem) => {
  //       const { textContent } = menuItem.firstChild;
  //       const firstLetter = textContent.toLowerCase().charAt(0);
  //       return e.key === firstLetter;
  //     });

  //     // Exit early if there are no matches
  //     if (!matches.length) {
  //       return;
  //     }

  //     // If the focused item is a match, focus the next match.
  //     // Otherwise, focus the first match
  //     const currentNode = items[currentIndex];
  //     const nextMatch = matches.includes(currentNode) ? matches[1] : matches[0];
  //     const index = items.findIndex((item) => {
  //       return item === nextMatch;
  //     });

  //     move(index);
  //   };

  const keyDown = (e) => {
    switch (e.code) {
      case "ArrowUp":
        e.stopPropagation();
        e.preventDefault();
        // previous();
        break;
      case "ArrowDown":
        e.stopPropagation();
        e.preventDefault();
        // next();
        break;
      case "ArrowLeft":
        e.preventDefault();
        if (isRootMenu && direction === "horizontal") {
          //   close();
        } else {
          e.stopPropagation();
          //   close(true);
        }
        break;
      case "ArrowRight":
        e.preventDefault();
        // close();
        break;
      case "Home":
        e.stopPropagation();
        e.preventDefault();
        // first();
        break;
      case "End":
        e.stopPropagation();
        e.preventDefault();
        // last();
        break;
      case "Enter":
      case "Space":
        // close();
        break;
      case "Escape":
        e.stopPropagation();
        e.preventDefault();
        // close(true);
        break;
      case "Tab":
        // close(true);
        break;
      default:
        e.stopPropagation();
        // match(e);
        break;
    }
  };

  const listProps = {
    ...props,
    ref: listRef,
    id: listId,
    role: "menu",
    hidden: !isExpanded,
    className: "submenu",
    "aria-hidden": !isExpanded,
    "aria-labelledby": buttonId,
    "aria-orientation": "vertical",
    "data-menubar-submenu-list": "",
    onKeyDown: (e) => {
      onKeyDown?.(e);
      keyDown(e);
    },
    onClick: (e) => {
      onClick?.(e);
      //   close();
    },
  };

  return <ul {...listProps}>{children}</ul>;
};
