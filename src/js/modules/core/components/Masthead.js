import React from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Link } from "react-router-dom";
import injectSheet from "react-jss";
import { Hamburger } from "../icons";
import { openSidebar } from "../actions";

import { getTopLevelSections } from "../../sections/selectors";

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
  sectionButton: {
    position: "relative",
    left: "-605px",
    top: "-50px",
    width: "103px",
    height: "39px",
    borderRadius: "3px",
    border: "solid 1.5px #dddddd",
    backgroundColor: "white",
  },
  buttonName: {
    fontFamily: "Circular Std",
    fontSize: "14px",
    fontWeight: "bold",
    textAlign: "center",
    color: "#000000",
  },
  hamburger: {
    display: "inline",
    width: "25px",
    height: "23px",
    opacity: "0.48",
    marginRight: "4px",
  },
  subscribeButton: {
    width: "116px",
    height: "39px",
    borderRadius: "4px",
    backgroundColor: "#4e6a9e",
    position: "relative",
    left: "175px",
    top: "-50px",
    border: "solid 1.5px #4e6a9e",
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
  signIn: {
    borderRadius: "4px",
    backgroundColor: "#ffffff",
    border: "solid 1.5px #dddddd",
    position: "relative",
    left: "170px",
    top: "-46px",
    zIndex: "-1",
    height: "39px",
    width: "66px",
  },
  signInText: {
    fontFamily: "Circular Std",
    fontSize: "14px",
    fontWeight: "bold",
    textAlign: "center",
    color: "#000000",
  }
};

const Masthead = ({ classes, sections, openSideBar }) => {
  return (
    <div className={classes.Masthead}>
      <Link to="/" className={classes.theSpectatorLogo}>
        The Spectator
      </Link>
      <button className={classes.sectionButton} onClick={openSideBar}>
        <Hamburger className={classes.hamburger}/>
        <span className={classes.buttonName}>Sections</span>
      </button>
      <button className={classes.subscribeButton}>
        <span className={classes.subscribeText}>Subscribe</span><br/>
        <span className={classes.subscribeTo}>to our newsletter</span>
      </button>
      <button className={classes.signIn}>
        <span className={classes.signInText}>Sign In</span><br/>
      </button>
      <ul className={classes.sectionLinksNav}>
        {Object.values(sections).map(section => {
          return (
            <li key={section.id} className={classes.sectionListItem}>
              <Link to={section.permalink} className={classes.sectionLink}>
                {section.name}
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

const mapStateToProps = state => ({
  sections: getTopLevelSections(state),
});

const mapDispatchToProps = dispatch => {
  return bindActionCreators({ openSidebar }, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(
  injectSheet(styles)(Masthead),
);
