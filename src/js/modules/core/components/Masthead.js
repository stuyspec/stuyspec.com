import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import injectSheet from "react-jss";

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
    }
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
};

const Masthead = ({ classes, sections }) => {
  return (
    <div className={classes.Masthead}>
      <Link to="/" className={classes.theSpectatorLogo}>
        The Spectator
      </Link>
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

export default connect(mapStateToProps)(injectSheet(styles)(Masthead));
