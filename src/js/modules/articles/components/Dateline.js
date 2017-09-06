import React from "react";
import injectSheet from "react-jss";

const styles = {
  Dateline: {
    color: "#888888",
    fontFamily: "Circular Std",
    fontSize: "12px",
    fontWeight: "300",
  },
};

// TODO: format dates
const Dateline = ({ classes, article, customStyle }) => {
  return (
    <p className={customStyle ? customStyle.Dateline : classes.Dateline}>
      7:20 A.M.
    </p>
  );
};

export default injectSheet(styles)(Dateline);
