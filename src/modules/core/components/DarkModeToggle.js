import React from "react";

import useDarkMode from "use-dark-mode";
import { Moon, Sun } from "../icons";

const DarkModeToggle = () => {
  const darkMode = useDarkMode(false);
  const { value } = useDarkMode(false)

  return (
    <div className="dark-mode-toggle">
      <button style={{paddingLeft: '4px', paddingRight: '4px', paddingTop: '4px', paddingBottom: '4px', border: value ? "2px solid white" : "2px solid black"}} type="button" onClick={darkMode.toggle}>
        {value ? <Sun /> : <Moon />}
      </button>
    </div>
  );
};

export default DarkModeToggle;
