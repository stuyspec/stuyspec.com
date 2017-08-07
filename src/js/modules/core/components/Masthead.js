import React from 'react';
import injectSheet from 'react-jss';
import { Link } from 'react-router-dom';

/*
Site structure navigation links to the first layer items of the site
(the departments, “subscribe”, “more”). On non-article pages (homepage, department pages),
 the site structure navigation is displayed in a horizontal bar with a “The Spectator”
 heading above it (the Header). On article pages, no such navigation exists; there is
 only direct navigation. On mobile, no such navigation exists; there is only direct navigation.
 */

const styles = {
  Masthead: {
    borderBottom: '1px solid black',
    margin: '0px auto 24px auto',
    paddingTop: '11px',
    textAlign: 'center',
    width: '1060px',
  },
  theSpectatorLogo: {
    fontFamily: 'Old English Text MT',
    fontSize: '75px',
    marginBottom: '22px',
  },
  sectionLinksNav: {
    fontFamily: 'Circular Std',
    listStyleType: 'none',
    marginBottom: '16px',
    padding: '0px',
  },
  sectionListElement: {
    display: 'inline',
    margin: '0px 12px',
  },
  sectionLink: {
    color: '#000',
    fontSize: '14px',
    fontWeight: '500',
    textDecoration: 'none',
  },
};

// TODO: make <li>'s show up
const Masthead = ({ classes, topLevelSectionsWithDirectChildren }) => {
  const linkToTopLevelSections = () => {
    Object.keys(topLevelSectionsWithDirectChildren).map(sectionSlug => {
      const topLevelSection = topLevelSectionsWithDirectChildren[ sectionSlug ];
      return (
        <li key={topLevelSection.id} className={classes.sectionListElement}>
          <Link to={topLevelSection.permalink} className={classes.sectionLink}>
            {topLevelSection.name}
          </Link>
        </li>
      )
    })
  }
  return (
    <div className={classes.Masthead}>
      <div className={classes.theSpectatorLogo}>The Spectator</div>
      <ul className={classes.sectionLinksNav}>
        {linkToTopLevelSections()}
      </ul>
    </div>
  )
};

export default injectSheet(styles)(Masthead);