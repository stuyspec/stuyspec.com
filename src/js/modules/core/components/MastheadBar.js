import React from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import injectSheet from "react-jss";
import { Link } from "react-router-dom";
import { Hamburger, Search } from "../icons";
import { openSidebar } from "../actions";
import NavButton from "./NavButton";
import MobileNavButton from "./MobileNavButton";

import { openSubscriptionModal } from "../../accounts/actions";

const styles = {
  MastheadBar: {
    backgroundColor: "#fff",
    boxShadow: "0 2px 4px 0 rgba(0,0,0,.2)",
    height: "71px",
    left: 0,
    position: "absolute",
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
    marginTop: "1px",
    position: "absolute",
    textDecoration: "none",
    transform: "translate(-50%,0)",
    "&:hover, &:active, &:focus": {
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
  responsiveSectionNamesContainer: {
    display: "inline",
  },
  "@media (max-width: 768px)": {
    brandingLink: {
      width: "70%",
    },
    barContainer: {
      padding: "0 20px",
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

const MastheadBar = ({
  classes,
  openSidebar,
  openSubscriptionModal,
  session,
}) => {
  return (
    <div className={classes.MastheadBar}>
      <div className={classes.barContainer}>
        <div className={classes.quickNav}>
          <MobileNavButton onClick={openSidebar}>
            <Hamburger />
          </MobileNavButton>
          <Link to="/search">
            <NavButton label="search">
              <Search color="#000" />
            </NavButton>
          </Link>
        </div>
        <Link
          className={classes.brandingLink}
          to={"/"}
        >
          The Spectator
        </Link>
        {session ? (
          <div className={classes.userTools}>
            <Link to="/myaccount/profile">
              <NavButton label="profile" />
            </Link>
          </div>
        ) : (
          <div className={classes.userTools}>
            <Link to="/myaccount">
              <NavButton label="log in" />
            </Link>
            <NavButton
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
});

const mapDispatchToProps = dispatch => {
  return bindActionCreators({ openSidebar, openSubscriptionModal }, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(
  injectSheet(styles)(MastheadBar),
);
