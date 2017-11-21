import React from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import injectSheet from "react-jss";
import { Link } from "react-router-dom";

import { getCurrentUser } from "../../accounts/selectors";
import { Hamburger, Search } from "../icons";
import { openSidebar } from "../actions";
import { getTopLevelSections } from "../../sections/selectors";
import { openSubscriptionModal } from "../../accounts/actions";

const styles = {
  Masthead: {
    fontSize: 0, // resets font size to remove unwanted whitespace
    margin: "24px auto 19px auto",
    textAlign: "center",
    "& button:focus": {
      outline: 0,
    },
  },
  theSpectatorLogo: {
    color: "#000",
    display: "inline-block",
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
    margin: "0",
    padding: "0",
    "&:hover a": {
      textDecoration: "none",
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
    margin: "0px 13px",
  },
  sectionLink: {
    color: "#000",
    fontSize: "13px",
    fontWeight: 300,
    textDecoration: "none",
    "&:hover": {
      color: "#000",
    },
    "&:active": {
      color: "#000",
    },
    "&:focus": {
      color: "#000",
    },
  },
  hamburger: {
    display: "inline",
    width: "25px",
    height: "23px",
    opacity: "0.48",
    marginRight: "4px",
    float: "left",
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
    // left: "-20vh",
    top: "3vh",
  },
};

const SectionStyles = {
  Sec: {
    position: "relative",
    // left: "35vh",
    top: "3vh",
    width: "103px",
    height: "39px",
    borderRadius: "3px",
    border: "solid 1.5px #dddddd",
    backgroundColor: "white",
    float: "left",
    "& span": {
      position: "relative",
      top: "2px",
      transitionDuration: ".3s",
    },
    "&:hover span": {
      color: "#888",
    },
  },
};

const SubscribeStyles = {
  Sub: {
    width: "116px",
    height: "39px",
    borderRadius: 0,
    borderTopLeftRadius: "4px",
    borderBottomLeftRadius: "4px",
    backgroundColor: "#4e6a9e",
    border: "solid 1.5px #4e6a9e",
    display: "inline",
  },
};

const SignInStyles = {
  Sign: {
    borderRadius: 0,
    borderTopRightRadius: "4px",
    borderBottomRightRadius: "4px",
    backgroundColor: "#ffffff",
    border: "solid 1.5px #dddddd",
    borderLeft: 0,
    height: "39px",
    width: "66px",
    display: "inline",
    position: "relative",
    "& span": {
      transitionDuration: ".3s",
    },
    "&:hover span": {
      color: "#888",
    },
    // top: "19px",
  },
};

const NavButton = ({ children, onClick, classes, type }) => {
  return (
    <button onClick={onClick} className={classes[type]}>
      <div>{children}</div>
    </button>
  );
};

const StyledSectionButton = injectSheet(SectionStyles)(NavButton);
const StyledSubscribeButton = injectSheet(SubscribeStyles)(NavButton);
const StyledSignInButton = injectSheet(SignInStyles)(NavButton);

const Masthead = ({
  classes,
  openSidebar,
  sections,
  session,
  openSubscriptionModal,
}) => {
  const unwantedSectionNames = ["Art", "Photo", "Video"];
  return (
    <div className={classes.Masthead}>
      <StyledSectionButton onClick={openSidebar} type="Sec">
        <Hamburger className={classes.hamburger} />
        <span className={classes.buttonName}>Sections</span>
      </StyledSectionButton>
      <Link className={classes.theSpectatorLogo} to="/">
        The Spectator
      </Link>
      {!session.userId && (
      <table className={classes.positioning}>
        <th>
          <StyledSubscribeButton onClick={openSubscriptionModal} type="Sub">
            <span className={classes.subscribeText}>Subscribe</span>
            <br />
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
      )}
      <ul className={classes.sectionLinksNav}>
        {Object.values(sections).map(section => {
          if (!unwantedSectionNames.includes(section.name)) {
            return (
              <li key={section.id} className={classes.sectionListItem}>
                <Link to={section.permalink} className={classes.sectionLink}>
                  {section.name}
                </Link>
              </li>
            );
          }
        })}
        <li key={-1} className={classes.sectionListItem}>
          <Link
            onClick={openSubscriptionModal}
            to={"/"}
            className={classes.sectionLink}
          >
            Newsletter
          </Link>
        </li>
        {/*
        <li key={-2} className={classes.sectionListItem}>
          <Link to={"/paper"} className={classes.sectionLink}>
            The Paper
          </Link>
        </li>
      */}
      </ul>
    </div>
  );
};

const mapStateToProps = state => ({
  session: state.accounts.session,
  currentUser: getCurrentUser(state),
  sections: getTopLevelSections(state),
});

const mapDispatchToProps = dispatch => {
  return bindActionCreators({ openSubscriptionModal, openSidebar }, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(
  injectSheet(styles)(Masthead),
);
