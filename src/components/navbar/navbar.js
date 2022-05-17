import * as React from "react";
import Menubar from "./menubar";
import MenuItem from "./menuitem";
import { Submenu, SubmenuList, SubmenuTrigger } from "./submenu";

export const MENUBAR_LIST__1 = "menubar-list--1";
export const MENUBAR_MENUITEM__1 = "menubar-menuitem--1";
export const MENUBAR_MENUITEM__2 = "menubar-menuitem--2";
export const MENUBAR_MENUITEM__3 = "menubar-menuitem--3";
export const ROOT_TRIGGER__1 = "root-trigger--1";
export const ROOT_TRIGGER__2 = "root-trigger--2";
export const ROOT_LIST__1 = "root-list--1";
export const ROOT_LIST__2 = "root-list--2";
export const ROOT_LIST__1_MENUITEM__1 = "root-list--1-menuitem--1";
export const ROOT_LIST__1_MENUITEM__2 = "root-list--1-menuitem--2";
export const ROOT_LIST__1_MENUITEM__3 = "root-list--1-menuitem--3";
export const SUBMENU_TRIGGER__1 = "submenu-trigger--1";
export const SUBMENU_LIST__1 = "submenu-list--1";
export const SUBMENU_LIST__1_MENUITEM__1 = "submenu-list--1-menuitem--1";
export const SUBMENU_LIST__1_MENUITEM__2 = "submenu-list--1-menuitem--2";
export const SUBMENU_LIST__1_MENUITEM__3 = "submenu-list--1-menuitem--3";
export const SUBMENU_LIST__2 = "submenu-list--2";

/* eslint-disable jsx-a11y/anchor-is-valid*/
const DummyLink = (props) => (
  <a href="#" onClick={() => console.count("link clicked")} {...props}>
    Nav Menu Link
  </a>
);

const MockMenuItems = () => (
  <React.Fragment>
    <MenuItem>
      <DummyLink data-testid={MENUBAR_MENUITEM__1} />
    </MenuItem>

    <MenuItem>
      <DummyLink data-testid={MENUBAR_MENUITEM__2} />
    </MenuItem>

    <MenuItem>
      {(menuItemProps) => (
        <Submenu>
          <SubmenuTrigger data-testid={ROOT_TRIGGER__1} {...menuItemProps}>
            Root Trigger
          </SubmenuTrigger>

          <SubmenuList data-testid={ROOT_LIST__1}>
            <MenuItem>
              <DummyLink data-testid={ROOT_LIST__1_MENUITEM__1} />
            </MenuItem>

            <MenuItem>
              {(menuItemProps) => (
                <Submenu>
                  <SubmenuTrigger
                    data-testid={SUBMENU_TRIGGER__1}
                    {...menuItemProps}
                  >
                    Submenu Trigger
                  </SubmenuTrigger>

                  <SubmenuList data-testid={SUBMENU_LIST__1}>
                    <MenuItem>
                      <DummyLink data-testid={SUBMENU_LIST__1_MENUITEM__1} />
                    </MenuItem>

                    <MenuItem>
                      <DummyLink data-testid={SUBMENU_LIST__1_MENUITEM__2} />
                    </MenuItem>

                    <MenuItem>
                      <DummyLink data-testid={SUBMENU_LIST__1_MENUITEM__3} />
                    </MenuItem>
                  </SubmenuList>
                </Submenu>
              )}
            </MenuItem>

            <MenuItem>
              <DummyLink data-testid={ROOT_LIST__1_MENUITEM__2} />
            </MenuItem>

            <MenuItem>
              <DummyLink data-testid={ROOT_LIST__1_MENUITEM__3} />
            </MenuItem>
          </SubmenuList>
        </Submenu>
      )}
    </MenuItem>

    <MenuItem>
      {(menuItemProps) => (
        <Submenu>
          <SubmenuTrigger data-testid={ROOT_TRIGGER__2} {...menuItemProps}>
            Root Trigger
          </SubmenuTrigger>

          <SubmenuList data-testid={ROOT_LIST__2}>
            <MenuItem>
              <DummyLink />
            </MenuItem>

            <MenuItem>
              {(menuItemProps) => (
                <Submenu>
                  <SubmenuTrigger {...menuItemProps}>
                    Submenu Trigger
                  </SubmenuTrigger>
                  <SubmenuList data-testid={SUBMENU_LIST__2}>
                    <MenuItem>
                      <DummyLink />
                    </MenuItem>

                    <MenuItem>
                      <DummyLink />
                    </MenuItem>

                    <MenuItem>
                      <DummyLink />
                    </MenuItem>
                  </SubmenuList>
                </Submenu>
              )}
            </MenuItem>

            <MenuItem>
              <DummyLink />
            </MenuItem>

            <MenuItem>
              <DummyLink />
            </MenuItem>
          </SubmenuList>
        </Submenu>
      )}
    </MenuItem>

    <MenuItem>
      <DummyLink data-testid={MENUBAR_MENUITEM__3} />
    </MenuItem>
  </React.Fragment>
);

export const HorizontalMenubar = (props) => {
  return (
    <Menubar data-testid={MENUBAR_LIST__1} direction="horizontal" {...props}>
      <MockMenuItems />
    </Menubar>
  );
};

export const VerticalMenubar = (props) => {
  return (
    <Menubar data-testid={MENUBAR_LIST__1} direction="vertical" {...props}>
      <MockMenuItems />
    </Menubar>
  );
};
