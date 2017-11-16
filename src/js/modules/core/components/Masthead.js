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
    zIndex: "-1",
  },
  userTools: {
    float: "right",
    margin: "0",
    padding: "0"
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
    float: "right"
  },
  hamburger: {
    display: "inline",
    width: "25px",
    height: "23px",
    opacity: "0.48",
    marginRight: "4px",
    float: "left"
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
  positioning: {
    float: "right",
    overflow: "visible",
    display: "inline",
    position: "relative",
    left: "-20vh",
    top: "0.9vh",
  }
};

const SectionStyles = {
  Sec: {
    position: "relative",
    left: "35vh",
    top: "3vh",
    width: "103px",
    height: "39px",
    borderRadius: "3px",
    border: "solid 1.5px #dddddd",
    backgroundColor: "white",
    float: "left",
  },
};

const SubscribeStyles = {
  Sub: {
    width: "116px",
    height: "39px",
    borderRadius: "4px",
    backgroundColor: "#4e6a9e",
    border: "solid 1.5px #4e6a9e",
    display: "inline",
  }
};

const SignInStyles = {
  Sign: {
    borderRadius: "4px",
    backgroundColor: "#ffffff",
    border: "solid 1.5px #dddddd",
    height: "39px",
    width: "66px",
    zIndex: "-1",
    display: "inline",
    position: "relative",
    top: "19px",
    left: "-5px"
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
      <table className={classes.positioning}>
        <th>
          <StyledSubscribeButton type="Sub">
            <span className={classes.subscribeText}>Subscribe</span><br/>
            <span className={classes.subscribeTo}>to our newsletter</span>
          </StyledSubscribeButton>
        </th>
        <th>
          <div className={classes.userTools}>
            <Link to="/myaccount/profile">
              <StyledSignInButton type="Sign">
                <span className={classes.signInText}>Sign In</span>
              </StyledSignInButton>
            </Link>
          </div>
        </th>
      </table>
    </div>
  );
};

const mapStateToProps = state => ({
  currentUser: getCurrentUser(state),
});

export default connect(mapStateToProps)(injectSheet(styles)(Masthead));
