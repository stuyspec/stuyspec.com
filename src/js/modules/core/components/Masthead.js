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
    borderBottom: "1px solid black",
    margin: "0px auto 24px auto",
    paddingTop: "11px",
    textAlign: "center",
    maxWidth: "1060px",
  },
  theSpectatorLogo: {
    color: "#000",
    fontFamily: "Old English Text MT",
    fontSize: "42px",
    marginBottom: "22px",
    "&:hover": {
      color: "#000",
      textDecoration: "none",
    },
    "&:focus": {
      color: "#000",
      textDecoration: "none",
    },
    "@media (min-width: 768px)": {
      fontSize: "75px"
    },
    textAlign: "center",
  },
  userTools: {
    float: "right",
    marginTop: "9px",
    "& button": {
      marginLeft: "24px",
    },
  },
  sectionLinksNav: {
    fontFamily: "Circular Std",
    listStyleType: "none",
    marginBottom: "16px",
    padding: 0,
  },
  sectionListItem: {
    display: "inline",
    margin: "0px 12px",
  },
  sectionLink: {
    color: "#000",
    fontSize: "14px",
    fontWeight: 500,
    textDecoration: "none",
    "&:hover": {
      color: "#000",
      textDecoration: "none",
    },
    "&:focus": {
      color: "#000",
      textDecoration: "none",
    },
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
  SectionButton: {
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
  SubscribeButton: {
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
  SignInButton: {
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

const SecNavButton = ({ children, onClick, classes}) => {
  return (
    <button onClick={onClick} className={classes.SectionButton}>
      <div>{children}</div>
    </button>
  );
};

const SubNavButton = ({ children, onClick, classes}) => {
  return (
    <button onClick={onClick} className={classes.SubscribeButton}>
      <div>{children}</div>
    </button>
  );
};

const SignNavButton = ({ children, onClick, classes}) => {
  return (
    <button onClick={onClick} className={classes.SignInButton}>
      <div>{children}</div>
    </button>
  );
};

const StyledSectionButton = injectSheet(SectionStyles)(SecNavButton);
const StyledSubscribeButton = injectSheet(SubscribeStyles)(SubNavButton);
const StyledSignInButton = injectSheet(SignInStyles)(SignNavButton);

const Masthead = ({ classes, openSidebar, }) => {
  return (
    <div className={classes.Masthead}>
      <StyledSectionButton onClick={openSidebar}>
        <Hamburger className={classes.hamburger}/>
        <span className={classes.buttonName}>Sections</span>
      </StyledSectionButton>
      <Link className={classes.theSpectatorLogo} to="/">
        The Spectator
      </Link>
      <StyledSubscribeButton>
        <span className={classes.subscribeText}>Subscribe</span><br/>
        <span className={classes.subscribeTo}>to our newsletter</span>
      </StyledSubscribeButton>
      <div className={classes.userTools}>
        <Link to="/myaccount/profile">
          <StyledSignInButton>
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

const mapDispatchToProps = dispatch => {
  return bindActionCreators({ openSidebar }, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(
  injectSheet(styles)(Masthead),
);
