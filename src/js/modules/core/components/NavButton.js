import React from 'react';
import injectSheet from 'react-jss';

// TODO: find sprites

const styles = {
  NavButton: {
    background: 'none',
    borderWidth: '0px',
    margin: '0px',
    padding: '0px',
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

const NavButton = ({ classes, buttonType }) => {
  return (
    <button className={classes.NavButton}>
      <i className={classes[ buttonType ]}></i>
      <span className={classes.buttonText}>{buttonType}</span>
    </button>
  )
};

export default injectSheet(styles)(NavButton);