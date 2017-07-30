import React from 'react';
import injectSheet from 'react-jss';
import {Link} from 'react-router-dom';

/*
TODO: Add in direct navigation which leads users directly to some pages. (Exists on all pages)
 These links are both the left-aligned—hamburger menu of sections,
 search—and the right-aligned—account dropdown (if signed in, the
 options are to go to profile or logout; if signed out, the dropdown is
 replaced by “log in” and “subscribe” buttons). “The Spectator” occupies the
 centre of this navigation. This navigation is hereafter known as condensed-nav.
 On mobile, condensed-nav has no search or account dropdown.
*/

/*
TODO: Add in site structure navigation which links to the first layer items of the site
(the departments, “subscribe”, “more”). On non-article pages (homepage, department pages),
 the site structure navigation is displayed in a horizontal bar with a “The Spectator”
 heading above it (the Header). On article pages, no such navigation exists; there is
 only direct navigation. On mobile, no such navigation exists; there is only direct navigation.
 */
const styles = {
  PageHeader: {
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

const PageHeader = ({classes, sectionsWithSubsections}) => {
  return (
    <div className={classes.PageHeader}>
      <div className={classes.theSpectatorLogo}>The Spectator</div>
      <ul className={classes.sectionLinksNav}>
        {sectionsWithSubsections.map((topLevelSection) => {
          return (
            <li key={topLevelSection.id} className={classes.sectionListElement}>
              <Link to={`/${topLevelSection.slug}`} className={classes.sectionLink}>
                {topLevelSection.name}
              </Link>
            </li>
          )
        })}
      </ul>
    </div>
  )
};

export default (injectSheet(styles)(PageHeader));
