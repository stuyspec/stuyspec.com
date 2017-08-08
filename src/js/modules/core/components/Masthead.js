import React from "react";
import injectSheet from "react-jss";
import { Link } from "react-router-dom";

const styles = {
  Masthead: {
    borderBottom: '1px solid black',
    margin: '0px auto 24px auto',
    paddingTop: '11px',
    textAlign: 'center',
    width: '1060px',
  },
  theSpectatorLogo: {
    color: '#000',
    fontFamily: 'Old English Text MT',
    fontSize: '75px',
    marginBottom: '22px',
    '&:hover': {
      color: '#000',
      textDecoration: 'none',
    },
    '&:focus': {
      color: '#000',
      textDecoration: 'none',
    }
  },
  sectionLinksNav: {
    fontFamily: 'Circular Std',
    listStyleType: 'none',
    marginBottom: '16px',
    padding: 0,
  },
  sectionListItem: {
    display: 'inline',
    margin: '0px 12px',
  },
  sectionLink: {
    color: '#000',
    fontSize: '14px',
    fontWeight: 500,
    textDecoration: 'none',
  },
};

// TODO: make <li>'s show up
const Masthead = ({ classes, topLevelSectionsWithDirectChildren }) => {
  const linkToTopLevelSections = () => {
    return Object.keys(topLevelSectionsWithDirectChildren).map(sectionSlug => {
      const topLevelSection = topLevelSectionsWithDirectChildren[ sectionSlug ];
      return (
        <li key={`topLevelSection${topLevelSection.id}`} className={classes.sectionListItem}>
          <Link to={topLevelSection.permalink} className={classes.sectionLink}>
            {topLevelSection.name}
          </Link>
        </li>
      );
    });
  };
  return (
    <div className={classes.Masthead}>
      <Link to="/" className={classes.theSpectatorLogo}>The Spectator</Link>
      <ul className={classes.sectionLinksNav}>
        {linkToTopLevelSections()}
      </ul>
    </div>
  )
};

export default injectSheet(styles)(Masthead);