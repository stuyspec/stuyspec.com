import React from 'react';
import injectSheet from 'react-jss';

import Masthead from './Masthead';
import MastheadBar from './MastheadBar';

/*
  TODO: Add in direct navigation which leads users directly to some pages. (Exists on all pages)
   These links are both the left-aligned—hamburger menu of sections,
 search—and the right-aligned—account dropdown (if signed in, the
 options are to go to profile or logout; if signed out, the dropdown is
 replaced by “log in” and “subscribe” buttons). “The Spectator” occupies the
 centre of this navigation. This navigation is hereafter known as condensed-nav.
 On mobile, condensed-nav has no search or account dropdown.
*/

const styles = {
  PageHeader: {
    margin: '0px auto 24px auto',
    paddingTop: '11px',
    textAlign: 'center',
    width: '100%',
  },
  theSpectatorLogo: {
    fontFamily: 'Old English Text MT',
    fontSize: '75px',
    marginBottom: '22px',
    color: '#000000',
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
    color: '#000000',
    fontSize: '14px',
    fontWeight: '500',
    textDecoration: 'none',
  },
};

const PageHeader = ({ classes, location, sectionsWithSubsections }) => {
  return (
    <div className={classes.PageHeader}>
      {
        location.pathname === '/' ? (
          <Masthead sectionsWithSubsections={sectionsWithSubsections}/>
        ) : (
          <MastheadBar className={classes.MastheadBar}/>
        )
      }
    </div>
  )
};

export default (injectSheet(styles)(PageHeader));
