import React from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import injectSheet from "react-jss";
import { Link } from "react-router-dom";
import { getCurrentUser } from "../../accounts/selectors";
import { Hamburger, Search } from "../icons";
import { openSidebar } from "../actions";

const styles = {
  Masthead: {
    fontSize: 0, // resets font size to remove unwanted whitespace
    margin: "6px auto 19px auto",
    textAlign: "center",
  },
  theSpectatorLogo: {
    color: "#000",
    fontFamily: "Old English Text MT",
    fontSize: "75px",
    marginBottom: "10px",
    "&:hover": {
      color: "#000",
      textDecoration: "none",
    },
    "&:focus": {
      color: "#000",
      textDecoration: "none",
    },
    "@media (min-width: 768px)": {
      fontSize: "75px",
    },
  },
  userTools: {
    float: "right",
    marginTop: "9px",
    "& button": {
      marginLeft: "24px",
    },
  },
  sectionLinksNav: {
    borderTop: "1px solid black",
    fontFamily: "Circular Std",
    listStyleType: "none",
    padding: "6px",
  },
  sectionListItem: {
    display: "inline",
    margin: "0px 16px",
  },
  sectionLink: {
    color: "#000",
    fontSize: "12px",
    fontWeight: 300,
    textDecoration: "none",
  },
  hamburger: {
    display: "inline",
    width: "25px",
    height: "23px",
    opacity: "0.48",
    marginRight: "4px",
  },
  buttonName: {
    fontFamily: "Circular Std",
    fontSize: "14px",
    fontWeight: "bold",
    textAlign: "center",
    color: "#000000",
  },
  subscribeText: {
    fontFamily: "Circular Std",
    fontSize: "15px",
    fontWeight: "bold",
    textAlign: "center",
    color: "#ffffff",
  },
  subscribeTo: {
    position: "relative",
    top: "-7px",
    fontFamily: "Circular Std",
    fontSize: "12px",
    textAlign: "center",
    color: "#ffffff",
  },
  signInText: {
    fontFamily: "Circular Std",
    fontSize: "14px",
    fontWeight: "bold",
    textAlign: "center",
    color: "#000000",
  },
};

const SectionStyles = {
  Sec: {
    position: "relative",
    left: "-160px",
    top: "-50px",
    width: "103px",
    height: "39px",
    borderRadius: "3px",
    border: "solid 1.5px #dddddd",
    backgroundColor: "white",
  },
};

const SubscribeStyles = {
  Sub: {
    width: "116px",
    height: "39px",
    borderRadius: "4px",
    backgroundColor: "#4e6a9e",
    position: "relative",
    left: "191px",
    top: "-50px",
    border: "solid 1.5px #4e6a9e",
  }
};

const SignInStyles = {
  Sign: {
    borderRadius: "4px",
    backgroundColor: "#ffffff",
    border: "solid 1.5px #dddddd",
    position: "relative",
    left: "3px",
    top: "2px",
    zIndex: "-1",
    height: "39px",
    width: "66px",
  }
};

const NavButton = ({ children, onClick, classes, type}) => {
  return (
    <button onClick={onClick} className={classes[type]}>
      <div>{children}</div>
    </button>
  );
};

const StyledSectionButton = injectSheet(SectionStyles)(NavButton);
const StyledSubscribeButton = injectSheet(SubscribeStyles)(NavButton);
const StyledSignInButton = injectSheet(SignInStyles)(NavButton);

const Masthead = ({ classes, openSidebar, }) => {
  return (
    <div className={classes.Masthead}>
      <StyledSectionButton onClick={openSidebar} type="Sec">
        <Hamburger className={classes.hamburger}/>
        <span className={classes.buttonName}>Sections</span>
      </StyledSectionButton>
      <Link className={classes.theSpectatorLogo} to="/">
        The Spectator
      </Link>
      <StyledSubscribeButton type="Sub">
        <span className={classes.subscribeText}>Subscribe</span><br/>
        <span className={classes.subscribeTo}>to our newsletter</span>
      </StyledSubscribeButton>
      <div className={classes.userTools}>
        <Link to="/myaccount/profile">
          <StyledSignInButton type="Sign">
            <span className={classes.signInText}>Sign In</span>
          </StyledSignInButton>
        </Link>
      </div>
    </div>
  );
};

const mapStateToProps = state => ({
  currentUser: getCurrentUser(state),
});

export default connect(mapStateToProps)(injectSheet(styles)(Masthead));
