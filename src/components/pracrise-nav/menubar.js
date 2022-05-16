import * as React from "react";
import { MenubarContext } from "../../contexts/menubar";
import { usePrevious } from "../../hooks/usePrevious";

function PracticeMenubar({ children, ...props }) {
  const menuItems = React.useRef(new Set()).current;
  const value = React.useMemo(() => ({ menuItems }), [menuItems]);

  const [currentIndex, setCurrentIndex] = React.useState(0);
  const previousIndex = usePrevious(currentIndex) ?? null;

  React.useEffect(() => {
    if (currentIndex !== previousIndex) {
      const items = Array.from(menuItems);

      const currentNode = items[currentIndex]?.firstChild;
      const previousNode = items[previousIndex]?.firstChild;

      previousNode?.setAttribute("tab-index", "-1");
      currentNode?.setAttribute("tab-index", "0");
      currentNode?.focus();
    }
  }, [currentIndex, menuItems, previousIndex]);

  //   helper method
  const first = () => setCurrentIndex(0);

  const last = () => setCurrentIndex(menuItems.size - 1);

  const next = () => {
    const index = currentIndex === menuItems.size - 1 ? 0 : currentIndex + 1;
    console.log(index);
    setCurrentIndex(index);
  };

  const previous = () => {
    const index = currentIndex === 0 ? menuItems.size - 1 : currentIndex - 1;

    setCurrentIndex(index);
  };

  const match = (e) => {
    const items = Array.from(menuItems);

    const reorderedItems = [
      ...items.slice(currentIndex),
      ...items.slice(0, currentIndex),
    ];

    const matches = reorderedItems.filter((menuItem) => {
      const { textContext } = menuItem.firstChild;
      const firstLetter = textContext?.toLowerCase().charAt(0);

      return e.key === firstLetter;
    });

    if (!matches.length) {
      return;
    }

    const currentNode = items[currentIndex];
    const nextMatch = matches.includes(currentNode) ? matches[1] : matches[0];
    const index = items.findIndex((item) => item === nextMatch);

    setCurrentIndex(index);
  };

  const keyDown = (e) => {
    e.stopPropagation();

    switch (e.code) {
      case "ArrowLeft":
        e.preventDefault();
        // console.log(e.code);
        previous();
        break;
      case "ArrowRight":
        e.preventDefault();
        // console.log(e.code);
        next();
        break;
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
    "aria-orientation": "horizontal",
    "data-menubar-list": "",
    role: "menubar",
    onKeyDown: (e) => {
      keyDown(e);
    },
  };

  return (
    <MenubarContext.Provider value={value}>
      <ul {...listProps}>{children}</ul>
    </MenubarContext.Provider>
  );
}

export default PracticeMenubar;
