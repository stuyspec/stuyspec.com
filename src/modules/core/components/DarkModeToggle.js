import React from 'react';

import Toggle from './Toggle';
import useDarkMode from 'use-dark-mode';
import { Moon, Sun } from '../icons'

const DarkModeToggle = () => {
  const darkMode = useDarkMode(false);

  return (
    <div className="dark-mode-toggle">
      <button type="button" onClick={darkMode.disable}>
        <Sun />
      </button>
      <Toggle checked={darkMode.value} onChange={darkMode.toggle} />
      <button type="button" onClick={darkMode.enable}>
       <Moon />
      </button>
    </div>
  );
};

export default DarkModeToggle;
