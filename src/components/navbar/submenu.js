/* eslint-disable no-unused-expressions */
import * as React from "react";
import _ from "underscore";
import { MenubarContext, SubmenuContext } from "../../contexts/menubar";

const SUBMENU_INITIAL_STATE = {
  isExpanded: false,
  currentIndex: null,
  previousIndex: null,
};

function submenuReducer(state, action) {
  switch (action.type) {
    case "expand":
      return { ...state, isExpanded: true };
    case "collapse":
      return SUBMENU_INITIAL_STATE;
    case "move":
      return {
        ...state,
        isExpanded: true,
        currentIndex: action.index,
        previousIndex: state.currentIndex,
      };
    default:
      throw new Error(`${action.type} not recognised`);
  }
}

const Trigger = ({ onClick, onFocus, onKeyDown, onMouseOver, ...props }) => {
  const context = React.useContext(SubmenuContext);
  const menubarContext = React.useContext(MenubarContext);

  if (!context || !menubarContext) {
    throw new Error(
      "Submenu.Trigger must be used within a Menubar & Submenu Context"
    );
  }

  const {
    buttonId,
    buttonRef,
    listId,
    isRootMenu,
    isExpanded,
    first,
    last,
    open,
    close,
  } = context;

  const { direction } = menubarContext;

  const keyDown = (e) => {
    switch (e.code) {
      case "Enter":
      case "Space":
        e.stopPropagation();
        first();
        break;
      default:
        close();
        break;
    }

    if (direction === "horizontal" && isRootMenu) {
      switch (e.code) {
        case "ArrowUp":
          e.stopPropagation();
          last();
          break;
        case "ArrowDown":
          e.stopPropagation();
          first();
          break;
        case "ArrowLeft":
        case "ArrowRight":
          close();
          break;
        default:
          break;
      }
    } else {
      switch (e.code) {
        case "ArrowUp":
        case "ArrowDown":
          close();
          break;
        case "ArrowRight":
          e.stopPropagation();
          first();
          break;
        case "ArrowLeft":
          isRootMenu ? last() : close();
          break;
        default:
          break;
      }
    }
  };

  const buttonProps = {
    ...props,
    id: buttonId,
    ref: buttonRef,
    type: "button",
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
      const isRelatedFromSubmenu =
        relatedMenuItem?.getAttribute("data-menubar-submenu-listitem") === "";

      if (isRelatedFromSubmenu && relatedMenu !== targetMenu) {
        open();
      }
    },
  };

  return <button {...buttonProps} />;
};

const List = ({ children, onClick, onKeyDown, ...props }) => {
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
    menuItems,
    currentIndex,
    isRootMenu,
    isExpanded,
    dispatch,
    close,
    first,
    last,
  } = context;

  const { direction } = menubarContext;

  const previous = () => {
    const index = currentIndex === 0 ? menuItems.size - 1 : currentIndex - 1;
    dispatch({ type: "move", index });
  };

  const next = () => {
    const index = currentIndex === menuItems.size - 1 ? 0 : currentIndex + 1;
    dispatch({ type: "move", index });
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

    dispatch({ type: "move", index });
  };

  const keyDown = (e) => {
    switch (e.code) {
      case "ArrowUp":
        e.stopPropagation();
        e.preventDefault();
        previous();
        break;
      case "ArrowDown":
        e.stopPropagation();
        e.preventDefault();
        next();
        break;
      case "ArrowLeft":
        e.preventDefault();
        if (isRootMenu && direction === "horizontal") {
          close();
        } else {
          e.stopPropagation();
          close(true);
        }
        break;
      case "ArrowRight":
        e.preventDefault();
        close();
        break;
      case "Home":
        e.stopPropagation();
        e.preventDefault();
        first();
        break;
      case "End":
        e.stopPropagation();
        e.preventDefault();
        last();
        break;
      case "Enter":
      case "Space":
        close();
        break;
      case "Escape":
        e.stopPropagation();
        e.preventDefault();
        close(true);
        break;
      case "Tab":
        close(true);
        break;
      default:
        e.stopPropagation();
        match(e);
        break;
    }
  };

  const listProps = {
    ...props,
    id: listId,
    role: "menu",
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
      close();
    },
  };

  return (
    <ul hidden={!isExpanded} ref={listRef} className="submenu" {...listProps}>
      {children}
    </ul>
  );
};

const Submenu = ({ children }) => {
  const id = React.useRef(_.uniqueId("submenu--")).current;
  const buttonId = `button--${id}`;
  const listId = `list--${id}`;

  const buttonRef = React.useRef(null);
  const listRef = React.useRef(null);

  const menuItems = React.useRef(new Set()).current;
  const isRootMenu = !React.useContext(SubmenuContext);

  const [state, dispatch] = React.useReducer(
    submenuReducer,
    SUBMENU_INITIAL_STATE
  );

  const { isExpanded, currentIndex, previousIndex } = state;

  const first = React.useCallback(
    () => dispatch({ type: "move", index: 0 }),
    []
  );

  const last = React.useCallback(
    () => dispatch({ type: "move", index: menuItems.size - 1 }),
    [menuItems.size]
  );

  const open = React.useCallback(() => dispatch({ type: "expand" }), []);

  const close = React.useCallback(
    (focusButton = false) => {
      if (isExpanded) {
        focusButton && buttonRef.current?.focus();
        dispatch({ type: "collapse" });
      }
    },
    [isExpanded]
  );

  React.useEffect(() => {
    const items = Array.from(menuItems);

    if (currentIndex !== previousIndex) {
      const currentNode = items[currentIndex]?.firstChild;
      currentNode?.focus();
    }
  }, [menuItems, currentIndex, previousIndex]);

  React.useEffect(() => {
    const menuNode = listRef.current.parentNode;

    menuNode?.addEventListener("mouseenter", () => open(), false);
    menuNode?.addEventListener("mouseleave", () => close(), false);

    return () => {
      menuNode?.removeEventListener("mouseenter", () => open(), false);
      menuNode?.removeEventListener("mouseleave", () => close(), false);
    };
  }, [isExpanded, close, open]);

  const value = React.useMemo(
    () => ({
      buttonId,
      buttonRef,
      listId,
      listRef,
      menuItems,
      currentIndex,
      isRootMenu,
      isExpanded,
      dispatch,
      close,
      open,
      first,
      last,
    }),
    [
      buttonId,
      buttonRef,
      listId,
      listRef,
      menuItems,
      currentIndex,
      isRootMenu,
      isExpanded,
      dispatch,
      close,
      open,
      first,
      last,
    ]
  );

  return (
    <SubmenuContext.Provider value={value}>{children}</SubmenuContext.Provider>
  );
};

Submenu.Trigger = Trigger;
Submenu.List = List;

export default Submenu;
