import React from "react";
import { Link } from "react-router-dom";
import injectSheet from "react-jss";

const styles = {
  Byline: {
    color: "#888",
    fontFamily: "Circular Std",
    fontSize: "1.4rem",
    fontWeight: 300,
    "& p": {
      display: "inline",
      margin: "0 0 2px 0",
      "& a": {
        color: "#888",
        "&:hover, &:active, &:focus": {
          color: "#888",
        },
      },
    },
  },
};

const Byline = ({ classes, contributors }) => {
  let separator = ", ";
  return (
    <div className={classes.Byline}>
      {contributors.map((contributor, index) => {
        if (index === contributors.length - 2) {
          separator = " & ";
        } else if (index === contributors.length - 1) {
          separator = "";
        }
        return (
          <p key={index} className={classes.Byline}>
            {index === 0 ? "By " : ""}
            <Link to={`/contributors/${contributor.slug}`}>
              {contributor.firstName} {contributor.lastName}
            </Link>
            {separator}
          </p>
        );
      })}
    </div>
  );
};

export default injectSheet(styles)(Byline);
