import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import injectSheet from "react-jss";

import { getTopLevelSections } from "../../sections/selectors";

const styles = {
  Masthead: {
    fontSize: 0, // resets font size to remove unwanted whitespace
    margin: '6px auto 18px auto',
    textAlign: 'center',
    width: '1066px',
  },
  theSpectatorLogo: {
    color: '#000',
    fontFamily: 'Old English Text MT',
    fontSize: '75px',
    marginBottom: '10px',
    '&:hover': {
      color: '#000',
      textDecoration: 'none',
    },
    "&:focus": {
      color: "#000",
      textDecoration: "none",
    },
  },
  sectionLinksNav: {
    borderTop: '1px solid black',
    fontFamily: 'Circular Std',
    listStyleType: 'none',
    padding: '6px',
  },
  sectionListItem: {
    display: 'inline',
    margin: '0px 16px',
  },
  sectionLink: {
    color: '#000',
    fontSize: '12px',
    fontWeight: 300,
    textDecoration: 'none',
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
        <li key={ -1 } className={ classes.sectionListItem }>
          <Link to={ "/maybe-we-should-pop-up-the-subscribe-modal" } className={classes.sectionLink}>
            Subscribe
        </li>
          </Link>
      </ul>
    </div>
  );
};

const mapStateToProps = state => ({
  sections: getTopLevelSections(state),
});

export default connect(mapStateToProps)(injectSheet(styles)(Masthead));
