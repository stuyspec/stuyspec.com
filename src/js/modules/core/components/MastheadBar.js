import React from 'react';
import injectSheet from 'react-jss';
import { Link } from 'react-router-dom';

import NavButton from './NavButton';

const styles = {
  MastheadBar: {
    backgroundColor: '#fff',
    height: '40px',
    position: 'fixed',
    top: '0px',
    width: '100%',
  },
  barContainer: {
    borderBottom: '1px solid #ddd',
    height: '100%',
    margin: '0 auto',
    position: 'relative',
    width: '1320px',
    textAlign: 'center',
  },
  quickNav: {
    float: 'left',
    marginTop: '12px',
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
    marginTop: '12px',
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
          <NavButton buttonType="sections" className={classes.leftEdgeNavButton}/>
          <NavButton buttonType="search"/>
        </div>
        <Link className={classes.brandingLink} to="/">
          The Spectator
        </Link>
        <div className={classes.userTools}>
          <NavButton buttonType="log in"/>
          <NavButton buttonType="subscribe"/>
        </div>
      </div>
    </div>
  )
};

export default injectSheet(styles)(MastheadBar);