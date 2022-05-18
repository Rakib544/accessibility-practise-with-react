import * as React from "react";
import _ from "underscore";
import { SubmenuContext } from "../../contexts/menubar";

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

export function PracticeSubmenu({ children }) {
  const id = React.useRef(_.uniqueId("submenu--")).current;
  const buttonId = `button--${id}`;
  const buttonRef = React.useRef(null);
  const listId = `list--${id}`;
  const listRef = React.useRef(null);
  const menuItems = React.useRef(new Set()).current;
  const isRootMenu = !React.useContext(SubmenuContext);

  const [state, dispatch] = React.useReducer(
    submenuReducer,
    SUBMENU_INITIAL_STATE
  );
  const { isExpanded, currentIndex, previousIndex } = state;

  const open = React.useCallback(() => dispatch({ type: "expand" }), []);

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
      open,
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
      open,
    ]
  );

  React.useEffect(() => {
    const items = Array.from(menuItems);

    if (currentIndex !== previousIndex) {
      const currentNode = items[currentIndex]?.firstChild;
      currentNode?.focus();
    }
  }, [menuItems, currentIndex, previousIndex]);

  React.useEffect(() => {
    const menuNode = listRef.current?.parentNode;

    menuNode?.addEventListener("mouseenter", () => open(), false);
    //   menuNode?.addEventListener("mouseleave", () => close(), false);

    return () => {
      menuNode?.removeEventListener("mouseenter", () => open(), false);
      // menuNode?.removeEventListener("mouseleave", () => close(), false);
    };
  }, [isExpanded, open, listRef]);

  return (
    <SubmenuContext.Provider value={value}>{children}</SubmenuContext.Provider>
  );
}
