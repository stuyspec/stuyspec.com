import React from "react";
import { Link } from "react-router-dom";
import injectSheet from "react-jss";

import { PROFILE_SLUGS } from "../../../constants";
import { capitalizeWord } from "../../../utils";

const styles = {
  caption: {
    fontFamily: "Minion Pro",
    fontSize: "14px",
    lineHeight: "1.1",
    marginTop: "10px",
  },
  creditLine: {
    color: "#888",
    position: "relative",
  },
};

const ArticleMediaCaption = ({ classes, image }) => {
  const { user } = image;
  let { caption } = image;

  // If the caption does not end in a period, add one.
  if (caption && caption.substr(caption.length - 1) !== ".") {
    caption += ".";
  }

  return (
    <figcaption className={classes.caption}>
      <span>
        {/* Render caption if caption is not null and is not empty string. */}
        {caption && caption + " "}
      </span>
      <Link
        className={classes.creditLine}
        to={`/${PROFILE_SLUGS[image.mediaType]}/${user.slug}`}
      >
        {capitalizeWord(image.mediaType)}
        &nbsp;by&nbsp;
        {user.firstName}
        {/* Department names are stored in firstName, not lastName, requiring the following logic */}
        {user.lastName !== "" && " " + user.lastName}
      </Link>
      .
    </figcaption>
  );
};

export default injectSheet(styles)(ArticleMediaCaption);
