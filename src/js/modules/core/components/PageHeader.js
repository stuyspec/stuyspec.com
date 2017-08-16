import React from "react";
import injectSheet from "react-jss";

import Masthead from "./Masthead";
import MastheadBar from "./MastheadBar";

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
    color: '#000',
  },
  sectionLinksNav: {
    fontFamily: 'Circular Std',
    listStyleType: 'none',
    marginBottom: '16px',
    padding: 0,
  },
  sectionListElement: {
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

const PageHeader = ({ classes, location, topLevelSectionsWithDirectChildren }) => {
  return (
    <div className={ classes.PageHeader }>
      {
        location.pathname === '/' ? (
          <Masthead
            topLevelSectionsWithDirectChildren={ topLevelSectionsWithDirectChildren }/>
        ) : (
          <MastheadBar
            topLevelSectionsWithDirectChildren={ topLevelSectionsWithDirectChildren }/>
        )
      }
    </div>
  )
};

export default (injectSheet(styles)(PageHeader));
