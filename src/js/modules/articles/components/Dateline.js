import React from "react";
import injectSheet from "react-jss";
import dateFormat from "dateformat";

const MILLISECONDS_IN_DAY = 8.64e7;

const styles = {
  Dateline: {
    color: "#888",
    fontFamily: "Circular Std",
    fontSize: "12px",
    fontWeight: 300,
    marginBottom: 0,
  },
};

/* dateFormat:
 * longDate: June 9, 2007
 * shortTime: 5:46 PM
 */

const Dateline = ({ classes, timestamp }) => {
  let dateline = dateFormat(timestamp, "longDate");
  // If the timestamp is the same day (< 24 hours difference), use the
  // shortTime format. If not, use the longDate format.
  if (new Date() - new Date(timestamp) < MILLISECONDS_IN_DAY) {
    dateline = dateFormat(timestamp, "shortTime");
  }
  return <p className={classes.Dateline}>{dateline}</p>;
};

export default injectSheet(styles)(Dateline);
