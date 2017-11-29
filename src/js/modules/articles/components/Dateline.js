import React from "react";
import injectSheet from "react-jss";
import { formatDate } from "../../../utils";

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
  return <p className={classes.Dateline}>{formatDate(article.createdAt)}</p>;
};

export default injectSheet(styles)(Dateline);
