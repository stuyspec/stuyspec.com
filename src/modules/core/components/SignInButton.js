import React from 'react';
import injectSheet from 'react-jss';

const styles = {
  SignIn: {
    borderRadius: 0,
    borderTopRightRadius: '4px',
    borderBottomRightRadius: '4px',
    backgroundColor: '#ffffff',
    border: 'solid 1.5px #dddddd',
    borderLeft: 0,
    width: '80px',
    height: '45px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
    '& span': {
      transitionDuration: '.3s',
    },
    '&:hover span': {
      color: '#888',
    },
  },
  text: {
    fontFamily: 'Circular Std',
    fontSize: '1.6rem',
    margin: 0,
    fontWeight: 'bold',
    color: '#000000',
  },
};

function SignInButton({ classes }) {
  return (
    <button className={classes.SignIn}>
      <span className={classes.text}>Sign In</span>
    </button>
  );
}

export default injectSheet(styles)(SignInButton);
