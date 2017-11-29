import React from "react";
import injectSheet from "react-jss";
import dateFormat from "dateformat";


const styles = {
  Dateline: {
    color: "#888888",
    fontFamily: "Circular Std",
    fontSize: "12px",
    fontWeight: "300",
    marginBottom: 0,
  },
};

const Dateline = ({ classes, article }) => {
  return <p className={classes.Dateline}>{dateFormat(article.createdAt, "mmmm dS, yyyy")}</p>;
};

export default injectSheet(styles)(Dateline);
