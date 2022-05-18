// import "../../styles/navbar.css";
import PracticeMenubar from "./menubar";
import PracticeMenuItem from "./menuitem";
import { PracticeSubmenu } from "./submenu";
import { PracticeSubmenuList } from "./submenuList";
import { PracticeSubmenuTrigger } from "./submenuTrigger";

function PracticeNav() {
  return (
    <nav aria-label="Barmi Union High School">
      <PracticeMenubar
        aria-label="Barmi Union High School"
        className="w-full bg-sky-500 flex justify-center"
      >
        <PracticeMenuItem>
          <a
            href="#Rakib"
            className="focus:bg-sky-600 text-white focus:outline-none focus:border-2 focus:border-white px-4 py-2"
          >
            About
          </a>
        </PracticeMenuItem>
        <PracticeMenuItem>
          <a
            href="#Rakib"
            className="focus:bg-sky-600 text-white focus:outline-none focus:border-2 focus:border-white px-4 py-2"
          >
            Admissions
          </a>
        </PracticeMenuItem>
        <PracticeMenuItem>
          <PracticeSubmenu>
            <PracticeSubmenuTrigger>Test</PracticeSubmenuTrigger>
            <PracticeSubmenuList>
              <PracticeMenuItem>
                <a
                  href="#Rakib"
                  className="focus:bg-sky-600 text-white focus:outline-none focus:border-2 focus:border-white px-4 py-2"
                >
                  Admissions
                </a>
              </PracticeMenuItem>
            </PracticeSubmenuList>
          </PracticeSubmenu>
        </PracticeMenuItem>
      </PracticeMenubar>
    </nav>
  );
}

export default PracticeNav;
