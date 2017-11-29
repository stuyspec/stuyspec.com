import React from "react";
import injectSheet from "react-jss";
import dateFormat from "dateformat";

const MILLISECONDS_IN_DAY = 8.64e7

const styles = {
  Dateline: {
    color: "#888888",
    fontFamily: "Circular Std",
    fontSize: "12px",
    fontWeight: "300",
    marginBottom: 0,
  },
};

/* dateFormat:
 * longDate: June 9, 2007
 * shortTime: 5:46 PM
 */

const Dateline = ({ classes, article }) => {
  let dateline = dateFormat(article.createdAt, "longDate");
  if (new Date() - new Date(article.createdAt) < MILLISECONDS_IN_DAY) {
    dateline = dateFormat(article.createdAt, "shortTime");
  }
  return <p className={classes.Dateline}>{dateline}</p>;
};

export default injectSheet(styles)(Dateline);
