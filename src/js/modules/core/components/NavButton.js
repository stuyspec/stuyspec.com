import React from 'react';
import injectSheet from 'react-jss';

const styles = {
  NavButton: {
    background: 'none',
    borderWidth: '0px',
    margin: '0px',
    padding: '0px',
    '&:hover': {
      cursor: 'pointer',
    }
  },
  sections: {
    // background: sections sprite
  },
  search: {
    // background: search sprite
  },
  buttonText: {
    color: '#000',
    fontFamily: 'Circular Std',
    fontSize: '12px',
    fontWeight: 'bold',
    textTransform: 'uppercase',
  }
};

const NavButton = ({ classes, label }) => {
  return (
    <button className={classes.NavButton}>

      <span className={classes.buttonText}>{label}</span>
    </button>
  )
};

export default injectSheet(styles)(NavButton);
