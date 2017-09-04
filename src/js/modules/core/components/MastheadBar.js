import React from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import injectSheet from "react-jss";
import { Link } from "react-router-dom";
import { getCurrentUser } from '../../accounts/selectors'
import { Hamburger, Search } from "../icons";
import { openSidebar } from "../actions";

const styles = {
  MastheadBar: {
    backgroundColor: "#fff",
    boxShadow: "0 2px 4px 0 rgba(0,0,0,.1)",
    height: "40px",
    position: "fixed",
    width: "100%",
    top: 0,
    zIndex: 1000,
  },
  barContainer: {
    height: "100%",
    margin: "0 auto",
    padding: "0px 30px",
    position: "relative",
    width: "100%",
    textAlign: "center",
  },
  quickNav: {
    float: "left",
    marginTop: "9px",
    "& button": {
      marginRight: "24px",
    },
  },
  brandingLink: {
    color: "#000",
    fontFamily: "Old English Text MT",
    fontSize: "26px",
    left: "50%",
    marginTop: "4px",
    position: "absolute",
    textDecoration: "none",
    transform: "translate(-50%,0)",
    "&:hover": {
      color: "#000",
      textDecoration: "none",
    },
    "&:focus": {
      color: "#000",
      textDecoration: "none",
    },
  },
  userTools: {
    float: "right",
    marginTop: "9px",
    "& button": {
      marginLeft: "24px",
    },
  },
};

const navButtonStyles = {
  NavButton: {
    background: "none",
    borderWidth: 0,
    margin: 0,
    padding: 0,
    "&:hover": {
      cursor: "pointer",
    },
  },
  buttonText: {
    color: "#000",
    fontFamily: "Circular Std",
    fontSize: "12px",
    fontWeight: "bold",
    textTransform: "uppercase",
  },
  icon: {
    display: "inline",
    marginRight: "4px",
  },
};

const NavButton = ({ classes, children, label, onClick }) => {
  return (
    <button className={classes.NavButton} onClick={onClick}>
      <div className={classes.icon}>{children}</div>
      <span className={classes.buttonText}>{label}</span>
    </button>
  );
};
const StyledNavButton = injectSheet(navButtonStyles)(NavButton);

const MastheadBar = ({ classes, openSidebar, currentUser }) => {
  return (
    <div className={classes.MastheadBar}>
      <div className={classes.barContainer}>
        <div className={classes.quickNav}>
          <StyledNavButton label="sections" onClick={openSidebar}>
            <Hamburger />
          </StyledNavButton>
          <StyledNavButton label="search">
            <Search />
          </StyledNavButton>
        </div>
        <Link className={classes.brandingLink} to="/">
          The Spectator
        </Link>
        {currentUser ? (
          <div className={classes.userTools}>
            <Link to="/myaccount/profile">
              <StyledNavButton label="profile" />
            </Link>
          </div>
        ) : (
          <div className={classes.userTools}>
            <Link to="/myaccount/">
              <StyledNavButton label="log in" />
            </Link>
            <StyledNavButton label="subscribe" />
          </div>
        )}
      </div>
    </div>
  );
};

const mapStateToProps = state => ({
  currentUser: getCurrentUser(state)
});

const mapDispatchToProps = dispatch => {
  return bindActionCreators({ openSidebar }, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(
  injectSheet(styles)(MastheadBar),
);
