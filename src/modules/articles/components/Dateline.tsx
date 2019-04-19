import React from "react";
import injectSheet from "react-jss";
import dateFormat from "dateformat";

const MILLISECONDS_IN_DAY = 8.64e7;

const styles = {
  Dateline: {
    color: "#888",
    fontFamily: "Circular Std",
    fontSize: "1.3rem",
    fontWeight: 300,
    marginBottom: 0,
  },
};

/* dateFormat:
 * longDate: June 9, 2007
 * shortTime: 5:46 PM
 */

 interface IProps {
   classes: any,
   timestamp: string,
 }

/* Welcome to Dateline: Real-Life Crimes, Bad Situations */
const Dateline: React.FunctionComponent<IProps> = ({ classes, timestamp }) => {
  // If the timestamp is the same day (< 24 hours difference), use the
  // shortTime format. If not, use the longDate format.
  const dateline = dateFormat(
    timestamp,
    new Date().getTime() - new Date(timestamp).getTime() < MILLISECONDS_IN_DAY
      ? "shortTime"
      : "longDate",
  );
  return <p className={classes.Dateline}>{dateline}</p>;
};

export default injectSheet(styles)(Dateline);
