import React, { createRef, useEffect, useRef, useState } from "react";

const KEY_CODES = {
  ENTER: 13,
  SPACE: 32,
  DOWN_ARROW: 40,
  ESC: 27,
  UP_ARROW: 38,
};

const getNextOptionIndex = (currentIndex, options) => {
  if (currentIndex === null) {
    return 0;
  }

  if (currentIndex === options.length - 1) {
    return 0;
  }

  return currentIndex + 1;
};

const getPreviousOptionIndex = (currentIndex, options) => {
  if (currentIndex === null) {
    return 0;
  }

  if (currentIndex === 0) {
    return options.length - 1;
  }

  return currentIndex - 1;
};

const Select = ({
  options = [],
  label = "Please select an option ...",
  onOptionSelected: handler,
  renderOption,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(null);
  const [highlightedIndex, setHighlightedIndex] = useState(null);
  const labelRef = useRef(null);
  const [optionRefs, setOptionRefs] = useState([]);
  const [overlayTop, setOverlayTop] = useState(0);

  const onOptionSelected = (option, optionIndex) => {
    handler(option, optionIndex);

    setSelectedIndex(optionIndex);
    setIsOpen(false);
  };

  const onLabelClick = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    setOverlayTop((labelRef.current?.offsetHeight || 0) + 10);
  }, [labelRef.current?.offsetHeight]);

  const highlightItem = (optionIndex) => {
    setHighlightedIndex(optionIndex);
  };

  const onButtonKeyDown = (event) => {
    event.preventDefault();

    if (
      [KEY_CODES.ENTER, KEY_CODES.SPACE, KEY_CODES.DOWN_ARROW].includes(
        event.keyCode
      )
    ) {
      setIsOpen(true);

      //   set focus on the list item
      highlightItem(0);
    }
  };

  useEffect(() => {
    setOptionRefs(options.map((_) => createRef()));
  }, [options]);

  useEffect(() => {
    if (highlightedIndex !== null && isOpen) {
      const ref = optionRefs[highlightedIndex];

      if (ref && ref.current) {
        ref.current.focus();
      }
    }
  }, [highlightedIndex, isOpen, optionRefs]);

  const onOptionKeyDown = (event) => {
    if (event.keyCode === KEY_CODES.ESC) {
      setIsOpen(false);
      return;
    }

    if (event.keyCode === KEY_CODES.DOWN_ARROW) {
      highlightItem(getNextOptionIndex(highlightedIndex, options));
    }

    if (event.keyCode === KEY_CODES.UP_ARROW) {
      highlightItem(getPreviousOptionIndex(highlightedIndex, options));
    }

    if (event.keyCode === KEY_CODES.ENTER) {
      onOptionSelected(options[highlightedIndex], highlightedIndex);
    }
  };

  return (
    <div>
      <h1 className="text-3xl text-center font-medium">
        This is select components
      </h1>
      <div className="my-6 flex flex-col relative">
        <button
          onKeyDown={onButtonKeyDown}
          aria-controls="select-list"
          aria-haspopup={true}
          aria-expanded={isOpen ? true : undefined}
          ref={labelRef}
          onClick={onLabelClick}
          className="flex justify-between items-center bg-sky-500 p-4 rounded text-white border-2 border-sky-700"
        >
          <span>
            {selectedIndex === null ? label : options[selectedIndex].label}
          </span>
          <span>
            {isOpen ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M5 15l7-7 7 7"
                />
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            )}
          </span>
        </button>

        {isOpen ? (
          <ul
            role="menu"
            id="select-list"
            className="bg-white z-20 absolute w-full shadow-md"
            style={{ top: overlayTop }}
          >
            {options.map((option, optionIndex) => {
              const isSelected = selectedIndex === optionIndex;
              const isHighlighted = highlightedIndex === optionIndex;

              const ref = optionRefs[optionIndex];

              const renderOptionProps = {
                option,
                isSelected,
                getOptionRecommendedProps: (overrideProps = {}) => {
                  return {
                    ref,
                    role: "menuitemradio",
                    tabIndex: isHighlighted ? -1 : 0,
                    onKeyDown: onOptionKeyDown,
                    "aria-checked": isSelected ? true : undefined,
                    "aria-label": option.label,
                    onMouseEnter: () => highlightItem(optionIndex),
                    onMouseLeave: () => highlightItem(null),
                    className: `flex justify-between items-center w-full cursor-pointer p-4 ${
                      isSelected ? "bg-green-500 text-white" : ""
                    }  ${isHighlighted ? "bg-gray-100" : ""}`,
                    key: option.value,
                    onClick: () => onOptionSelected(option, optionIndex),
                    ...overrideProps,
                  };
                },
              };

              if (renderOption) {
                return renderOption(renderOptionProps);
              }

              return (
                <li {...renderOptionProps.getOptionRecommendedProps()}>
                  <span> {option.label}</span>
                  {isSelected ? (
                    <span>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-6 w-6"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={2}
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                    </span>
                  ) : null}
                </li>
              );
            })}
          </ul>
        ) : null}
      </div>
    </div>
  );
};

export default Select;
