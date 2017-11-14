import React from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Link } from "react-router-dom";
import injectSheet from "react-jss";

import { getTopLevelSections } from "../../sections/selectors";
import { openSubscriptionModal } from "../../accounts/actions";

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
};

const Masthead = ({ classes, sections, openSubscriptionModal }) => {
  const unwantedSectionNames = ["Video", "Photo", "Art"];
  return (
    <div className={classes.Masthead}>
      <Link to="/" className={classes.theSpectatorLogo}>
        The Spectator
      </Link>
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
        <li key={-2} className={classes.sectionListItem}>
          <Link to={"/paper"} className={classes.sectionLink}>
            The Paper
          </Link>
        </li>
      </ul>
    </div>
  );
};

const mapStateToProps = state => ({
  sections: getTopLevelSections(state),
});

const mapDispatchToProps = dispatch => {
  return bindActionCreators({ openSubscriptionModal }, dispatch);
};
export default connect(mapStateToProps, mapDispatchToProps)(injectSheet(styles)(Masthead));
