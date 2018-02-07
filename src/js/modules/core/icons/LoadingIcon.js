import React from "react";
import injectSheet from "react-jss";

const styles = {
  LoadingIcon: {
    margin: "16px auto !important",
  },
};

const LoadingIcon = ({ classes }) => {
  // Since this is the same loading icon as in the HTML, we need id's so
  // main-index.css will style it.
  return (
    <div id="loading" className={classes.LoadingIcon}>
      <div id="bounce1"></div>
      <div id="bounce2"></div>
      <div id="bounce3"></div>
    </div>
  );
};

export default injectSheet(styles)(LoadingIcon);
