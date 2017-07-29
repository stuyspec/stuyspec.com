import React from 'react';
import injectSheet from 'react-jss';
import {Link} from 'react-router-dom';

const styles = {
  PageHeader: {
    margin: '0 auto',
    width: '1060px',
    textAlign: 'center',
  },
  theSpectator: {
    fontFamily: 'Old English Text MT',
    fontSize: '80px',
  },
  sectionLinksBlock: {
    fontFamily: 'Circular Std',
    fontWeight: '500',
    listStyleType: 'none',
  },
  sectionListElement: {
    display: 'inline',
    margin: '0px 20px',
  },
  sectionLink: {
    textDecoration: 'none',
    color: '#000000',
  },
};

const PageHeader = ({classes, sectionsWithSubsections}) => {
  return (
    <div className={classes.PageHeader}>
      <div className={classes.theSpectator}>The Spectator</div>
      <ul className={classes.sectionLinksBlock}>
        {sectionsWithSubsections.map((topLevelSection)=>{
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