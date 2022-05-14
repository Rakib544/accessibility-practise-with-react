import * as React from "react";
import "../../styles/navbar.css";
import { HorizontalMenubar, VerticalMenubar } from "./navbar";

export default function Test() {
  const [direction, setDirection] = React.useState("horizontal");
  const toggle = () =>
    setDirection(direction === "horizontal" ? "vertical" : "horizontal");
  const label = `${direction} menubar`;

  return (
    <div className="App">
      <header>
        <h1>Navigation Menubar example</h1>

        <div>
          <a
            href="https://www.w3.org/TR/wai-aria-practices/examples/menubar/menubar-1/menubar-1.html"
            target="_blank"
            rel="noreferrer"
            style={{ display: "block", padding: "1rem" }}
          >
            https://www.w3.org/TR/wai-aria-practices/examples/menubar/menubar-1/menubar-1.html
          </a>

          <button onClick={toggle} style={{ margin: "1rem" }}>
            Direction: {direction}
          </button>
        </div>
      </header>

      <hr />

      <section>
        <nav aria-label={label}>
          {direction === "horizontal" ? (
            <HorizontalMenubar aria-label={label} />
          ) : null}

          {direction === "vertical" ? (
            <VerticalMenubar aria-label={label} />
          ) : null}
        </nav>
      </section>
    </div>
  );
}
