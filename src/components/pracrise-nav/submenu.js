import * as React from "react";
import { SubmenuContext } from "../../contexts/menubar";

const submenuInitialState = {
  currentIndex: null,
  previousIndex: null,
  isExpanded: false,
};

function submenuReducer(state, action) {
  switch (action.type) {
    case "expand":
      return {
        ...state,
        isExpanded: true,
      };
    case "collapse":
      return submenuInitialState;
    case "move":
      return {
        ...state,
        isExpanded: true,
        currentIndex: action.index,
        previousIndex: state.currentIndex,
      };
    default:
      throw new Error(`${action.type} is not recognized`);
  }
}

function Submenu({ children }) {
  const menuItems = React.useRef(new Set()).current;
  const [state, dispatch] = React.useReducer(
    submenuReducer,
    submenuInitialState
  );

  //   defining the helper functions
  const open = React.useCallback(() => dispatch({ type: "expand" }), []);
  const close = React.useCallback(() => dispatch({ type: "collapse" }), []);
  const first = React.useCallback(
    () => dispatch({ type: "move", index: 0 }),
    []
  );
  const last = React.useCallback(
    () => dispatch({ type: "move", index: menuItems.size - 1 }),
    [menuItems.size]
  );
  const move = React.useCallback(
    (index) => dispatch({ type: "move", index }),
    []
  );

  const value = React.useMemo(
    () => ({ open, close, first, last, move }),
    [close, first, last, move, open]
  );

  return (
    <SubmenuContext.Provider value={value}>{children}</SubmenuContext.Provider>
  );
}

export default Submenu;
