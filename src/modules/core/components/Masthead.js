import React from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import injectSheet from "react-jss";
import { Link } from "react-router-dom";
import { Grid } from "react-bootstrap/lib";
import SubscribeButton from "./SubscribeButton";
import SectionsButton from "./SectionsButton";
import { Search } from "../icons";
import { openSidebar } from "../actions";
import { openSubscriptionModal } from "../../accounts/actions";
import { FeaturedSectionsBar } from "../../sections/components";
import DarkModeToggle from "./DarkModeToggle";

const styles = {
  Masthead: {
    paddingTop: "20px",
    display: "flex",
    flexDirection: "column",
    paddingBottom: "0%",
  },
  theSpectatorLogo: {
    flexGrow: "2",
    color: "#000",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    fontFamily: "Old English Text MT",
    fontSize: "8rem",
    marginBottom: "10px",
    "&:hover, &:active, &:focus": {
      color: "#000",
      textDecoration: "none",
    },
    "@media (min-width: 768px)": {
      fontSize: "65px",
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
  signedInNav: {
    top: "5px",
    display: "flex",
    position: "relative",
  },
  FeaturedSectionsBarContainer: {
    borderTop: "1px solid",
    borderBottom: "1px solid gray",
    width: "100%",
    marginBottom: "2rem",
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
  toggle: {
    marginRight: "20%",
    marginTop: "3%",
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
  logo: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  positioning: {
    display: "flex",
    flexDirection: "row",
  },
};

const Masthead = ({ classes, openSidebar, session, openSubscriptionModal }) => {
  return (
    <Grid className={classes.Masthead}>
      <div className={classes.logo}>
        <SectionsButton onClick={openSidebar} />
        <Link className={classes.theSpectatorLogo} to="/">
          The Spectator
        </Link>
        <div className={classes.positioning}>
          {session ? (
            <div className={classes.signedInNav}>
              <Link to="/myaccount/profile" className={classes.myAccount}>
                My Account
              </Link>
              <Link to="/search" className={classes.searchLink}>
                <Search />
              </Link>
            </div>
          ) : (
            <>
              <div className={classes.toggle}>
                <DarkModeToggle />
              </div>
              <SubscribeButton onClick={openSubscriptionModal} />
            </>
          )}
          {/*!session && (
            <div className={classes.userTools}>
              <Link to="/myaccount/profile">
                <SignInButton />
              </Link>
            </div>
          )*/}
        </div>
      </div>
      <div className={classes.FeaturedSectionsBarContainer}>
        <FeaturedSectionsBar />
      </div>
    </Grid>
  );
};

const mapStateToProps = (state) => ({
  session: state.accounts.session,
});

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({ openSubscriptionModal, openSidebar }, dispatch);
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(injectSheet(styles)(Masthead));
