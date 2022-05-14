import * as React from "react";
import Menubar from "./menubar";

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
    <Menubar.MenuItem>
      <DummyLink data-testid={MENUBAR_MENUITEM__1} />
    </Menubar.MenuItem>

    <Menubar.MenuItem>
      <DummyLink data-testid={MENUBAR_MENUITEM__2} />
    </Menubar.MenuItem>

    <Menubar.MenuItem>
      {(menuItemProps) => (
        <Menubar.Submenu>
          <Menubar.Submenu.Trigger
            data-testid={ROOT_TRIGGER__1}
            {...menuItemProps}
          >
            Root Trigger
          </Menubar.Submenu.Trigger>

          <Menubar.Submenu.List data-testid={ROOT_LIST__1}>
            <Menubar.MenuItem>
              <DummyLink data-testid={ROOT_LIST__1_MENUITEM__1} />
            </Menubar.MenuItem>

            <Menubar.MenuItem>
              {(menuItemProps) => (
                <Menubar.Submenu>
                  <Menubar.Submenu.Trigger
                    data-testid={SUBMENU_TRIGGER__1}
                    {...menuItemProps}
                  >
                    Submenu Trigger
                  </Menubar.Submenu.Trigger>

                  <Menubar.Submenu.List data-testid={SUBMENU_LIST__1}>
                    <Menubar.MenuItem>
                      <DummyLink data-testid={SUBMENU_LIST__1_MENUITEM__1} />
                    </Menubar.MenuItem>

                    <Menubar.MenuItem>
                      <DummyLink data-testid={SUBMENU_LIST__1_MENUITEM__2} />
                    </Menubar.MenuItem>

                    <Menubar.MenuItem>
                      <DummyLink data-testid={SUBMENU_LIST__1_MENUITEM__3} />
                    </Menubar.MenuItem>
                  </Menubar.Submenu.List>
                </Menubar.Submenu>
              )}
            </Menubar.MenuItem>

            <Menubar.MenuItem>
              <DummyLink data-testid={ROOT_LIST__1_MENUITEM__2} />
            </Menubar.MenuItem>

            <Menubar.MenuItem>
              <DummyLink data-testid={ROOT_LIST__1_MENUITEM__3} />
            </Menubar.MenuItem>
          </Menubar.Submenu.List>
        </Menubar.Submenu>
      )}
    </Menubar.MenuItem>

    <Menubar.MenuItem>
      {(menuItemProps) => (
        <Menubar.Submenu>
          <Menubar.Submenu.Trigger
            data-testid={ROOT_TRIGGER__2}
            {...menuItemProps}
          >
            Root Trigger
          </Menubar.Submenu.Trigger>

          <Menubar.Submenu.List data-testid={ROOT_LIST__2}>
            <Menubar.MenuItem>
              <DummyLink />
            </Menubar.MenuItem>

            <Menubar.MenuItem>
              {(menuItemProps) => (
                <Menubar.Submenu>
                  <Menubar.Submenu.Trigger {...menuItemProps}>
                    Submenu Trigger
                  </Menubar.Submenu.Trigger>
                  <Menubar.Submenu.List data-testid={SUBMENU_LIST__2}>
                    <Menubar.MenuItem>
                      <DummyLink />
                    </Menubar.MenuItem>

                    <Menubar.MenuItem>
                      <DummyLink />
                    </Menubar.MenuItem>

                    <Menubar.MenuItem>
                      <DummyLink />
                    </Menubar.MenuItem>
                  </Menubar.Submenu.List>
                </Menubar.Submenu>
              )}
            </Menubar.MenuItem>

            <Menubar.MenuItem>
              <DummyLink />
            </Menubar.MenuItem>

            <Menubar.MenuItem>
              <DummyLink />
            </Menubar.MenuItem>
          </Menubar.Submenu.List>
        </Menubar.Submenu>
      )}
    </Menubar.MenuItem>

    <Menubar.MenuItem>
      <DummyLink data-testid={MENUBAR_MENUITEM__3} />
    </Menubar.MenuItem>
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
