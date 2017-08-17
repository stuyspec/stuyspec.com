import React from "react";
import injectSheet from "react-jss";
import { PAGE_HEADER_BOTTOM_MARGIN } from "../../../constants";

import Masthead from "./Masthead";
import MastheadBar from "./MastheadBar";

const styles = {
  PageHeader: {
    margin: '0 auto',
    marginBottom: PAGE_HEADER_BOTTOM_MARGIN,
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
