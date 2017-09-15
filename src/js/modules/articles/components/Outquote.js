import React from "react";
import injectSheet from "react-jss";

const styles = {
  Outquote: {
    border: "1px solid #000",
    borderStyle: "solid none",
    color: "#000",
    fontFamily: "Minion Pro",
    fontSize: "16px",
    fontStyle: "italic",
    lineHeight: 1.25,
    padding: "7px 35px",
    textAlign: "center",
  },
};

// TODO: format dates
const Outquote = ({ classes, article }) => {
  return <p className={classes.Outquote}>7:20 A.M.</p>;
};

export default injectSheet(styles)(Outquote);
