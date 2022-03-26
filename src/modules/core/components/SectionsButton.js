import React from 'react';
import injectSheet from 'react-jss';
import { Hamburger } from '../icons';

const styles = {
  SectionsButton: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    width: '9vw',
    minWidth: '119px',
    height: '45px',
    maxWidth: '140px',
    paddingRight: '10px',
    borderRadius: '3px',
    border: 'solid 1.5px #dddddd',
    backgroundColor: 'white',
    float: 'left',
    '&:hover span': {
      color: '#888',
    },
  },
  hamburger: {
    minWidth: '24px',
    minHeight: '23px',
  },
  text: {
    fontFamily: 'Circular Std',
    paddingLeft: '5px',
    paddingTop: '2px',
    fontSize: '1.6rem',
    fontWeight: 'bold',
    textAlign: 'left',
    color: '#000',
    transitionDuration: '.3s',
  },
};

function SectionsButton({ onClick, classes }) {
  return (
    <button onClick={onClick} className={classes.SectionsButton}>
      <Hamburger className={classes.hamburger} />
      <span className={classes.text}>Sections</span>
    </button>
  );
}

export default injectSheet(styles)(SectionsButton);
