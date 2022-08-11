import React from "react";

import useDarkMode from "use-dark-mode";
import { Moon, Sun } from "../icons";

function DarkModeToggle() {
  const darkMode = useDarkMode(false);
  const { value } = useDarkMode(false);

  return (
    <div className="dark-mode-toggle">
      <button
        style={{
          padding: "3px",
          border: value ? "2px solid white" : "2px solid black",
          width: "35px",
          height: "35px",
          top: "3px",
        }}
        type="button"
        onClick={darkMode.toggle}
      >
        {value ? <Sun /> : <Moon />}
      </button>
    </div>
  );
}

export default DarkModeToggle;
