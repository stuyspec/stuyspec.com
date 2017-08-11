import React from "react";
import injectSheet from "react-jss";
import { Link } from "react-router-dom";
import FaBars from "react-icons/fa/bars";
import FaSearch from "react-icons/fa/search";

const styles = {
  MastheadBar: {
    backgroundColor: '#fff',
    boxShadow: '0 2px 4px 0 rgba(0,0,0,.1)',
    height: '40px',
    position: 'fixed',
    width: '100%',
    top: 0,
    zIndex: 9998, // sidebar.zIndex = 9999
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
  }
};

const NavButton = ({ classes, label, onClick }) => {
  const createIcons = () => {
    switch (label) {
      case "sections":
        return <FaBars className={classes.barsIcon}/>;
      case "search":
        return <FaSearch className={classes.searchIcon}/>;
    }
  };
  return (
    <button className={classes.NavButton} onClick={onClick}>
      {createIcons()}
      <span className={classes.buttonText}>{label}</span>
    </button>
  );
};
const StyledNavButton = injectSheet(navButtonStyles)(NavButton);

class MastheadBar extends React.Component {
  constructor(props) {
    super(props);
  };

  toggleSidebar = () => {
    this.props.toggleSidebar();
  }

  render () {
    const {classes} = this.props;
    return (
      <div className={classes.MastheadBar}>
        <div className={classes.barContainer}>
          <div className={classes.quickNav}>
            <StyledNavButton label="sections" onClick={this.toggleSidebar}/>
            <StyledNavButton label="search"/>
          </div>
          <Link className={classes.brandingLink} to="/">
            The Spectator
          </Link>
          <div className={classes.userTools}>
            <StyledNavButton label="log in"/>
            <StyledNavButton label="subscribe"/>
          </div>
        </div>
      </div>
    );
  }
}

export default injectSheet(styles)(MastheadBar);