import React from 'react';
import injectSheet from 'react-jss';
import { Link } from 'react-router-dom';

import NavButton from './NavButton';

const styles = {
  MastheadBar: {
    backgroundColor: '#fff',
    height: '40px',
    padding: '0px 60px',
    position: 'fixed',
    width: '100%',
    top: '0px',
  },
  barContainer: {
    borderBottom: '1px solid #ddd',
    height: '100%',
    margin: '0 auto',
    position: 'relative',
    width: '100%',
    textAlign: 'center',
  },
  quickNav: {
    float: 'left',
    marginTop: '9px',
    '& button': {
      marginRight: '24px',
    },
  },
  brandingLink: {
    color: '#000',
    fontFamily: 'Old English Text MT',
    fontSize: '26px',
    marginTop: '4px',
    textDecoration: 'none',
  },
  userTools: {
    float: 'right',
    marginTop: '9px',
    '& button': {
      marginLeft: '24px',
    }
  }
};

const MastheadBar = ({ classes }) => {
  return (
    <div className={classes.MastheadBar}>
      <div className={classes.barContainer}>
        <div className={classes.quickNav}>
          <NavButton label="sections" className={classes.leftEdgeNavButton}/>
          <NavButton label="search"/>
        </div>
        <Link className={classes.brandingLink} to="/">
          The Spectator
        </Link>
        <div className={classes.userTools}>
          <NavButton label="log in"/>
          <NavButton label="subscribe"/>
        </div>
      </div>
    </div>
  )
};

export default injectSheet(styles)(MastheadBar);
