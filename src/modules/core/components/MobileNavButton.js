import React from 'react';
import injectSheet from 'react-jss';
import DarkModeToggle from './DarkModeToggle';

const navButtonStyles = {
  MobileNavButton: {
    background: 'none',
    borderWidth: 0,
    display: 'none',
    margin: 0,
    padding: 0,
    '&:hover': {
      cursor: 'pointer',
    },
  },
  buttonText: {
    color: '#000',
    fontFamily: 'Circular Std',
    fontSize: '12px',
    fontWeight: 'bold',
    textTransform: 'uppercase',
  },
  icon: {
    display: 'inline',
    marginRight: '4px',
  },
  DarkModeToggle: {
    position: 'absolute',
    marginLeft: '-9999px',
    bottom: '5px',
    display: 'hidden',
  },
  '@media (max-width: 1300px)': {
    MobileNavButton: {
      display: 'flex',
    },
    DarkModeToggle: {
      display: 'block !important',
      marginLeft: '5rem',
    },
  },
};

function MobileNavButton({
  classes, children, label, onClick,
}) {
  return (
    <div>
      <div className={classes.DarkModeToggle}>
        <DarkModeToggle />
      </div>
      <button className={classes.MobileNavButton} onClick={onClick}>
        <div className={classes.icon}>{children}</div>
        <span className={classes.buttonText}>{label}</span>
      </button>
    </div>
  );
}

export default injectSheet(navButtonStyles)(MobileNavButton);
