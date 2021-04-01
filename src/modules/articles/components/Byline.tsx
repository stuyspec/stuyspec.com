import React from "react";
import { Link } from "react-router-dom";
import injectSheet from "react-jss";

import { IContributor } from '../queries';

const styles = {
  Byline: {
    color: "#888",
    fontFamily: "Comic Sans MS",
    fontSize: "1.3rem",
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

interface IProps {
  classes: any,
  contributors: IContributor[]
}

const Byline: React.FunctionComponent<IProps> = ({ classes, contributors }) => {
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
              {contributor.first_name || ""} {contributor.last_name || ""}
            </Link>
            {separator}
          </p>
        );
      })}
    </div>
  );
};

export default injectSheet(styles)(Byline);
