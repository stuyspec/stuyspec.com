import React from "react";
import injectSheet from "react-jss";

import Masthead from "./Masthead";
import MastheadBar from "./MastheadBar";

const styles = {
  PageHeader: {
    margin: '0 auto',
    marginBottom: '60px',
    textAlign: 'center',
    width: '100%',
  },
};

const PageHeader = ({ classes, location, topLevelSectionsWithDirectChildren }) => {
  return (
    <div className={ classes.PageHeader }>
      {
        location.pathname === '/' ? (
          <Masthead topLevelSectionsWithDirectChildren={
            topLevelSectionsWithDirectChildren
          }/>
        ) : (
          <MastheadBar topLevelSectionsWithDirectChildren={
            topLevelSectionsWithDirectChildren
          }/>
        )
      }
    </div>
  );
};

export default (injectSheet(styles)(PageHeader));
