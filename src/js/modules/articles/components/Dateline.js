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
  let dateText = "";
  if (article.volume == 108) {
    if (article.issue == 1) {
      dateText = "September 11, 2017";
    } else if (article.issue == 2) {
      dateText = "September 29, 2017";
    } else if (article.issue == 3) {
      dateText = "October 10, 2017";
    } else if (article.issue == 4) {
      dateText = "October 31, 2017";
    } else if (article.issue == 5) {
      dateText = "November 10, 2017";
    }
  }
  if (article.volume == 107) {
    if (article.issue == 16) {
      dateText = "June 9, 2017";
    }
  }
  // return <p className={classes.Dateline}>{formatDate(article.createdAt)}</p>;
  return <p className={classes.Dateline}>{dateText}</p>;
};

export default injectSheet(styles)(Dateline);
