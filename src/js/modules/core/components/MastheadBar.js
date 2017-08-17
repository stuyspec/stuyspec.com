import React from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import injectSheet from "react-jss";
import { Link } from "react-router-dom";

import { FaBars, FaSearch } from "../icons";
import { toggleSidebar } from "../actions";

const styles = {
  MastheadBar: {
    backgroundColor: '#fff',
    boxShadow: '0 2px 4px 0 rgba(0,0,0,.1)',
    height: '40px',
    position: 'fixed',
    width: '100%',
    top: 0,
    zIndex: 1000,
  },
  barContainer: {
    height: '100%',
    margin: '0 auto',
    padding: '0px 30px',
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
    '&:hover': {
      color: '#000',
      textDecoration: 'none',
    },
    '&:focus': {
      color: '#000',
      textDecoration: 'none',
    },
  },
  userTools: {
    float: 'right',
    marginTop: '9px',
    '& button': {
      marginLeft: '24px',
    }
  },
};

const navButtonStyles = {
  NavButton: {
    background: 'none',
    borderWidth: 0,
    margin: 0,
    padding: 0,
    '&:hover': {
      cursor: 'pointer',
    }
  },
  buttonText: {
    color: '#000',
    fontFamily: 'Circular Std',
    fontSize: '12px',
    fontWeight: 'bold',
    textTransform: 'uppercase',
  },
  barsIcon: {
    marginRight: '6px',
  },
  searchIcon: {
    marginRight: '3px',
  }
};

const NavButton = ({ classes, label, onClick }) => {
  const createIcon = () => {
    switch (label) {
      case "sections":
        return <FaBars className={ classes.barsIcon }/>;
      case "search":
        return <FaSearch className={ classes.searchIcon }/>;
    }
  };
  return (
    <button className={ classes.NavButton } onClick={ onClick }>
      { createIcon() }
      <span className={ classes.buttonText }>{ label }</span>
    </button>
  );
};
const StyledNavButton = injectSheet(navButtonStyles)(NavButton);

const MastheadBar = ({ classes, isSidebarOpen, toggleSidebar }) => {
  return (
    <div className={ classes.MastheadBar }>
      <div className={ classes.barContainer }>
        <div className={ classes.quickNav }>
          <StyledNavButton label="sections" onClick={ () => toggleSidebar(!isSidebarOpen) }/>
          <StyledNavButton label="search"/>
        </div>
        <Link className={ classes.brandingLink } to="/">
          The Spectator
        </Link>
        <div className={ classes.userTools }>
          <StyledNavButton label="log in"/>
          <StyledNavButton label="subscribe"/>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  isSidebarOpen: state.core.isSidebarOpen,
});

const mapDispatchToProps = dispatch => {
  return bindActionCreators({ toggleSidebar }, dispatch);
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(injectSheet(styles)(MastheadBar));