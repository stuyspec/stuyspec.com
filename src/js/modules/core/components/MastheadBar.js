import React from "react";
import injectSheet from "react-jss";
import { Link } from "react-router-dom";
import Icon from "react-icon-base";

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
  },
  barsIcon: {
    marginRight: '6px',
  },
  searchIcon: {
    marginRight: '3px',
  }
};

/**
 * Manual building from react-icons is necessary to avoid bundle error.
 * https://github.com/rob2d/generator-react-redux-gulp/issues/7#issuecomment-321824333
 */
const FaBars = props => (
  <Icon viewBox="0 0 40 40" {...props}>
    <g><path d="m37.3 30v2.9q0 0.5-0.4 1t-1 0.4h-31.5q-0.6 0-1-0.4t-0.4-1v-2.9q0-0.6 0.4-1t1-0.4h31.5q0.5 0 1 0.4t0.4 1z m0-11.4v2.8q0 0.6-0.4 1t-1 0.5h-31.5q-0.6 0-1-0.5t-0.4-1v-2.8q0-0.6 0.4-1t1-0.5h31.5q0.5 0 1 0.5t0.4 1z m0-11.5v2.9q0 0.6-0.4 1t-1 0.4h-31.5q-0.6 0-1-0.4t-0.4-1v-2.9q0-0.5 0.4-1t1-0.4h31.5q0.5 0 1 0.4t0.4 1z"/></g>
  </Icon>
);
const FaSearch = props => (
  <Icon viewBox="0 0 40 40" {...props}>
    <g><path d="m27.2 18.6q0-4.2-2.9-7.1t-7.1-2.9-7 2.9-3 7.1 2.9 7 7.1 3 7.1-3 2.9-7z m11.4 18.5q0 1.2-0.8 2.1t-2 0.8q-1.2 0-2-0.8l-7.7-7.7q-4 2.8-8.9 2.8-3.2 0-6.1-1.3t-5-3.3-3.4-5-1.2-6.1 1.2-6.1 3.4-5.1 5-3.3 6.1-1.2 6.1 1.2 5 3.3 3.4 5.1 1.2 6.1q0 4.9-2.7 8.9l7.6 7.6q0.8 0.9 0.8 2z"/></g>
  </Icon>
);

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
    console.log('sidebar toggled from MastheadBar');
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