import React from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import injectSheet from "react-jss";
import { Link } from "react-router-dom";
import { Hamburger, Search } from "../icons";
import { openSidebar } from "../actions";
import { getSections, getSectionSlugs } from "../../sections/selectors";

import { openSubscriptionModal } from "../../accounts/actions";

const styles = {
  MastheadBar: {
    backgroundColor: "#fff",
    boxShadow: "0 2px 4px 0 rgba(0,0,0,.2)",
    height: "40px",
    left: 0,
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
  sectionName: {
    borderLeft: "solid 1px #000",
    bottom: "4px",
    color: "#000",
    fontFamily: "Minion Pro",
    fontSize: "15px",
    fontWeight: "bold",
    lineHeight: "0.93",
    marginLeft: "7.5px",
    padding: "2.5px 0 0 7.5px",
    position: "relative",
  },
  responsiveSectionNamesContainer: {
    display: "inline",
  },
  sectionNameDesktop: {
    borderLeft: "solid 1px #000",
    bottom: "4px",
    color: "#000",
    display: "inline",
    fontFamily: "Minion Pro",
    fontSize: "15px",
    fontWeight: "bold",
    lineHeight: "0.93",
    marginLeft: "7.5px",
    padding: "2.5px 0 0 7.5px",
    position: "relative",
  },
  sectionNameMobile: {
    borderLeft: "solid 1px #000",
    bottom: "4px",
    color: "#000",
    display: "none",
    fontFamily: "Minion Pro",
    fontSize: "15px",
    fontWeight: "bold",
    lineHeight: "0.93",
    marginLeft: "7.5px",
    padding: "2.5px 0 0 7.5px",
    position: "relative",
  },
  "@media (max-width: 768px)": {
    brandingLink: {
      width: "70%",
    },
    barContainer: {
      padding: "0 20px",
    },
    sectionNameDesktop: {
      display: "none",
    },
    sectionNameMobile: {
      display: "inline",
    },
    quickNav: {
      float: "left",
      marginTop: "9px",
      "& button": {
        marginRight: "12px",
      },
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
  "@media (max-width: 768px)": {
    buttonText: {
      display: "none",
    },
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

const MastheadBar = ({
  classes,
  openSidebar,
  openSubscriptionModal,
  session,
  location,
  sectionSlugs,
  sections,
}) => {
  const sectionSlugArray = location.pathname.split("/");
  const sectionSlug = sectionSlugArray[sectionSlugArray.length - 1];
  let section = null;
  if (sectionSlugs.includes(sectionSlug)) {
    section = Object.values(sections).find(
      section => section.slug === sectionSlug,
    );
  }

  let mastheadSectionName = null;
  if (section && section.parentId) {
    mastheadSectionName = sections[section.parentId].name;
  }

  return (
    <div className={classes.MastheadBar}>
      <div className={classes.barContainer}>
        <div className={classes.quickNav}>
          <StyledNavButton label="sections" onClick={openSidebar}>
            <Hamburger />
          </StyledNavButton>
          <Link to="/search">
          <StyledNavButton label="search">
            <Search />
          </StyledNavButton>
          </Link>
        </div>
        <Link
          className={classes.brandingLink}
          to={
            section && section.parentId ? (
              sections[section.parentId].permalink
            ) : (
              "/"
            )
          }
        >
          The Spectator
          {mastheadSectionName === "Arts & Entertainment" ? (
            <span className={classes.responsiveSectionNameContainer}>
              <span className={classes.sectionNameDesktop}>
                {mastheadSectionName}
              </span>
              <span className={classes.sectionNameMobile}>A&E</span>
            </span>
          ) : (
            mastheadSectionName && (
              <span className={classes.sectionName}>{mastheadSectionName}</span>
            )
          )}
        </Link>
        {session.userId ? (
          <div className={classes.userTools}>
            <Link to="/myaccount/profile">
              <StyledNavButton label="profile" />
            </Link>
          </div>
        ) : (
          <div className={classes.userTools}>
            <Link to="/myaccount">
              <StyledNavButton label="log in" />
            </Link>
            <StyledNavButton
              label="subscribe"
              onClick={openSubscriptionModal}
            />
          </div>
        )}
      </div>
    </div>
  );
};

const mapStateToProps = state => ({
  session: state.accounts.session,
  sectionSlugs: getSectionSlugs(state),
  sections: getSections(state),
});

const mapDispatchToProps = dispatch => {
  return bindActionCreators({ openSidebar, openSubscriptionModal }, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(
  injectSheet(styles)(MastheadBar),
);
