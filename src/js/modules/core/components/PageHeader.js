import React from "react";
import injectSheet from "react-jss";

import Masthead from "./Masthead";
import MastheadBar from "./MastheadBar";

const styles = {
  PageHeader: {
    margin: '0 auto',
    textAlign: 'center',
    width: '100%',
  },
};

const PageHeader = ({ classes, location }) => {
  return (
    <div className={ classes.PageHeader }>
      { location.pathname === '/' ? <Masthead/> : <MastheadBar/> }
    </div>
  );
};

export default (injectSheet(styles)(PageHeader));
