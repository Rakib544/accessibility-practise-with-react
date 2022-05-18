import * as React from "react";
import { MenubarContext, SubmenuContext } from "../../contexts/menubar";

export function PracticeSubmenuTrigger({
  onClick,
  onFocus,
  onKeyDown,
  onMouseOver,
  ...props
}) {
  const context = React.useContext(SubmenuContext);
  const menubarContext = React.useContext(MenubarContext);

  if (!context || !menubarContext) {
    throw new Error(
      "SubmenuTrigger must be used within a Menubar & Submenu Context"
    );
  }

  const { buttonId, buttonRef, listId, isExpanded, open } = context;

  const keyDown = (e) => {
    switch (e.code) {
      case "Enter":
      case "Space":
        e.stopPropagation();
        // first();
        break;
      default:
        // close();
        break;
    }

    switch (e.code) {
      case "ArrowUp":
        e.stopPropagation();
        // last();
        break;
      case "ArrowDown":
        e.stopPropagation();
        // first();
        break;
      case "ArrowLeft":
      case "ArrowRight":
        // close();
        break;
      default:
        break;
    }
  };

  const triggerProps = {
    ...props,
    id: buttonId,
    ref: buttonRef,
    "aria-haspopup": true,
    "aria-expanded": isExpanded,
    "aria-controls": listId,
    "data-menubar-submenu-trigger": "",
    onClick: (e) => {
      onClick?.(e);
      e.stopPropagation();
    },
    onKeyDown: (e) => {
      onKeyDown?.(e);
      keyDown(e);
    },
    onMouseOver: (e) => {
      onMouseOver?.(e);
      open();
    },
    onFocus: (e) => {
      onFocus?.(e);

      const targetMenu = e.target?.parentNode?.parentNode;
      const relatedMenuItem = e.relatedTarget?.parentNode;
      const relatedMenu = relatedMenuItem?.parentNode;
      const isFromSubmenu =
        relatedMenuItem?.getAttribute("data-menubar-submenu-listitem") === "";

      if (isFromSubmenu && relatedMenu !== targetMenu) {
        open();
      }
    },
  };

  return <button {...triggerProps} />;
}
