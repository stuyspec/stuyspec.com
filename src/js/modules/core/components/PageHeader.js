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

const styles = {};

const PageHeader = ({classes}) => {
  return (
    <div>
      Header
    </div>
  )
};

export default (injectSheet(styles)(PageHeader));

