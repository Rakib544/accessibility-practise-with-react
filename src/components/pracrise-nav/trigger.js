import * as React from "react";
import { SubmenuContext } from "../../contexts/menubar";

function Trigger({ onKeyDown, ...props }) {
  const context = React.useContext(SubmenuContext);

  if (!context) {
    throw new Error("Trigger must be used within a Submenu Context");
  }

  const { buttonId, buttonRef, listId, isExpanded, first, last, open } =
    context;

  const keyDown = (e) => {
    switch (e.code) {
      case "ArrowUp":
        e.stopPropagation();
        last();
        break;
      case "ArrowDown":
        e.stopPropagation();
        first();
        break;
      case "Enter":
      case "Space":
        e.stopPropagation();
        first();
        break;
      default:
        break;
    }
  };

  const buttonProps = {
    ...props,
    "aria-haspopup": true,
    "aria-expanded": isExpanded,
    "aria-controls": listId,
    "data-menubar-submenu-trigger": "",
    id: buttonId,
    ref: buttonRef,
    type: "button",
    onKeyDown: (e) => {
      onKeyDown?.(e);
      keyDown(e);
    },
    onFocus: (e) => {
      const isFromSubMenu =
        e.relatedTarget?.getAttribute("data-menubar-submenu-menuitem") === "";
      if (isFromSubMenu) {
        open();
      }
    },
  };

  return <button {...buttonProps} />;
}

export default Trigger;
