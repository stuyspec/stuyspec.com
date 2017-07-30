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
};

const PageHeader = ({ location, sectionsWithSubsections }) => {
  return (
    <div>
      {/* <Masthead sectionsWithSubsections={sectionsWithSubsections}/> */}
      <MastheadBar/>
    </div>
  )
};

export default (injectSheet(styles)(PageHeader));
