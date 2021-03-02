import React from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import injectSheet from "react-jss";
import { Link } from "react-router-dom";

import { Hamburger, Search } from "../icons";
import { openSidebar } from "../actions";
import MobileNavButton from "./MobileNavButton";
import { FeaturedSectionsBar } from "../../sections/components";

import { openSubscriptionModal } from "../../accounts/actions";

const styles = {
  MastheadBar: {
    backgroundColor: "#fff",
    boxShadow: "0 2px 4px 0 rgba(0,0,0,.2)",
    height: "73px",
    left: 0,
    position: "fixed",
    width: "100%",
    top: 0,
    zIndex: 1000,
    display: "flex",
    flexDirection: "column",
    alignItems: "center"
  },
  barContainer: {
    display: "flex",
    height: "37px",
    justifyContent: "space-between",
    alignItems: "center",
    margin: "0 auto",
    padding: "0px 30px 0px 30px",
    position: "relative",
    textAlign: "center",
    width: "100%",
  },
  sidebarToggle: {
    "& button": {
      position: "relative",
      left: "-10px",
    },
  },
  brandingLink: {
    bottom: "5px",
    color: "#000",
    fontFamily: "Old English Text MT",
    fontSize: "2.5rem",
    textDecoration: "none",
    "&:hover, &:active, &:focus": {
      color: "#000",
      textDecoration: "none",
    },
      marginLeft:"40px",
  },
  navButtons: {
    marginTop: "20px",
    fontFamily: "Circular Std",
    fontSize: "13px",
    fontWeight: 300,
    display: "flex",
    flexDirection: "column",
    "& button": {
      marginLeft: "24px",
    },
  },
  userTools: {
    marginBottom: "12px",
    "& > a, span": {
      color: "#888",
      "&:hover, &:active, &:focus": {
        color: "#888",
        cursor: "pointer",
        textDecoration: "underline",
      },
    },
  },
  subscriber: {
    marginLeft: "9px",
    paddingLeft: "8px",
  },
  searchLink: {
    alignSelf: "flex-end",
    color: "#000",
    "&:hover, &:active, &:focus": {
      color: "#000",
    },
    "& svg": {
      display: "inline",
      marginRight: "4px",
      transform: "translateY(-2px)",
    },
  },
  responsiveSectionNamesContainer: {
    display: "inline",
  },
  sectionsBarContainer: {
    display: "flex",
    justifyContent: "center",
  },
  "@media (max-width: 1100px)": {
    MastheadBar: {
      height: "52px",
      flexDirection: "row"
    },
    sectionsBarContainer: {
      display: "none",
    },
    navButtons: {
      display: "none",
    },
  },
  "@media (max-width: 375px)": {
    brandingLink: {
      lineHeight: "2rem",
    },
  },
};

const MastheadBar = ({
  classes,
  openSidebar,
  openSubscriptionModal,
  session,
}) => {
  return (
    <div className={classes.MastheadBar}>
      <div className={classes.barContainer}>
        <div className={classes.sidebarToggle}>
          <MobileNavButton onClick={openSidebar}>
            <Hamburger color={"#000"} size={20} />
          </MobileNavButton>
        </div>
        <Link className={classes.brandingLink} to={"/"}>
          The Spectator
        </Link>
        <div className={classes.navButtons}>
          <div className={classes.userTools}>
            {/*session ? (
              <Link to="/myaccount/profile">Profile</Link>
            ) : (
              <Link to="/myaccount">Log In</Link>
            )*/}
            <span
              className={classes.subscriber}
              onClick={openSubscriptionModal}
            >
              Subscribe
            </span>
          </div>
          <Link to="/search" className={classes.searchLink}>
            <Search color={"#000"} />
            Search
          </Link>
        </div>
      </div>
      <div className={classes.sectionsBarContainer}>
        <FeaturedSectionsBar omitSearch={true} />
      </div>
    </div>
  );
};

const mapStateToProps = state => ({
  session: state.accounts.session,
});

const mapDispatchToProps = dispatch => {
  return bindActionCreators({ openSidebar, openSubscriptionModal }, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(
  injectSheet(styles)(MastheadBar),
);
