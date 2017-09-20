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

const Outquote = ({ classes, quote }) => {
  return <p className={classes.Outquote}>{quote}</p>;
};

export default injectSheet(styles)(Outquote);
