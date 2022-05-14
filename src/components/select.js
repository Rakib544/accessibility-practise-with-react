import React, { useEffect, useRef, useState } from "react";

const Select = ({
  options = [],
  label = "Please select an option ...",
  onOptionSelected: handler,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(null);
  const labelRef = useRef(null);
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

  return (
    <div>
      <h1 className="text-3xl text-center font-medium">
        This is select components
      </h1>
      <div className="my-6 flex flex-col relative">
        <button
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
            className="bg-white z-20 absolute w-full shadow-md"
            style={{ top: overlayTop }}
          >
            {options.map((option, optionIndex) => {
              const isSelected = selectedIndex === optionIndex;
              return (
                <li
                  onClick={() => onOptionSelected(option, optionIndex)}
                  key={option.value}
                  className={`flex justify-between items-center w-full cursor-pointer p-4 ${
                    isSelected ? "bg-green-500 text-white" : ""
                  }`}
                >
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
