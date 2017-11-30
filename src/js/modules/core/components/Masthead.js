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
    "&:hover, &:active, &:focus": {
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
  navSearchButton: {
    top: "-1px",
    position: "relative",
  },
  sectionLink: {
    color: "#000",
    fontSize: "13px",
    fontWeight: 300,
    textDecoration: "none",
    "&:hover, &:active, &:focus": {
      color: "#000",
    },
  },
  hamburger: {
    display: "inline",
    width: "24px",
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
    color: "#000",
  },
  subscribeText: {
    fontFamily: "Circular Std",
    fontSize: "15px",
    fontWeight: "bold",
    textAlign: "center",
    color: "#fff",
  },
  signedInNav: {
    top: "5px",
    display: "flex",
    position: "relative",
  },
  myAccount: {
    display: "inline",
    fontFamily: "Circular Std",
    fontSize: "14px",
    fontWeight: "bold",
    color: "#000",
    transitionDuration: ".3s",
    "&:hover, &:active, &:focus": {
      color: "#000",
    },
  },
  searchLink: {
    color: "#000",
    position: "relative",
    height: "17px",
    width: "17px",
    marginLeft: "15px",
    top: "1px",
    "& svg": {
      height: "100%",
      width: "100%",
    },
    "&:hover, &:active, &:focus": {
      color: "#000",
      textDecoration: "none",
    },
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

const isSafari = !!navigator.userAgent.match(/Version\/[\d\.]+.*Safari/);
const isFirefox = navigator.userAgent.indexOf("Firefox") > -1;

const navButtonStyles = {
  Sections: {
    position: "relative",
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
  Subscribe: {
    width: "116px",
    height: "39px",
    position: "relative",
    borderRadius: 0,
    borderTopLeftRadius: "4px",
    borderBottomLeftRadius: "4px",
    backgroundColor: "#DB2B39",
    border: "solid 1.5px #DB2B39",
    display: "inline",
    top: isSafari ? "-20px" : isFirefox ? "-4px" : "0",
  },
  SignIn: {
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
  },
};

const NavButton = ({ children, onClick, classes, type }) => {
  return (
    <button onClick={onClick} className={classes[type]}>
      <div>{children}</div>
    </button>
  );
};

const StyledNavButton = injectSheet(navButtonStyles)(NavButton);

const Masthead = ({
  classes,
  openSidebar,
  sections,
  session,
  openSubscriptionModal,
}) => {
  const unwantedSectionNames = ["Art", "Photo", "Video", "10/31 Terror Attack"];
  return (
    <div className={classes.Masthead}>
      <StyledNavButton onClick={openSidebar} type="Sections">
        <Hamburger className={classes.hamburger} />
        <span className={classes.buttonName}>Sections</span>
      </StyledNavButton>
      <Link className={classes.theSpectatorLogo} to="/">
        The Spectator
      </Link>
      <table className={classes.positioning}>
        <tbody>
          <tr>
            <th id="problematic-subscribe-button-container-in-moz">
            {session ? (
              <div className={classes.signedInNav}>
                <Link to="/myaccount/profile" className={classes.myAccount}>
                  My Account
                </Link>
                <Link to="/search" className={classes.searchLink}>
                  <Search className={classes.searchButton} />
                </Link>
              </div>
            ) : (
              <StyledNavButton
                onClick={openSubscriptionModal}
                type="Subscribe"
              >
                <span className={classes.subscribeText}>Subscribe</span>
                <br />
                <span className={classes.subscribeTo}>to our newsletter</span>
              </StyledNavButton>
            )}
            </th>
            {!session && (
              <th>
                <div className={classes.userTools}>
                  <Link to="/myaccount/profile">
                    <StyledNavButton type="SignIn">
                      <span className={classes.signInText}>Sign In</span>
                    </StyledNavButton>
                  </Link>
                </div>
              </th>
            )}
          </tr>
        </tbody>
      </table>
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
        <li key={-3} className={classes.sectionListItem}>
          <Link to="/search" className={classes.sectionLink}>
            <Search className={classes.navSearchButton} />
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
