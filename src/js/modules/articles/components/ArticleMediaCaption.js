import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import injectSheet from "react-jss";

import { MEDIA_CREATOR_SLUGS } from "../../../constants";
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

const ArticleMediaCaption = ({ classes, users, image }) => {
  const artist = users[image.userId];
  return (
    <figcaption className={classes.caption}>
      <span>
        {/* Render caption if caption is not null and is not empty string. */}
        {image.caption && image.caption}
      </span>
      <Link
        className={classes.creditLine}
        to={`/${MEDIA_CREATOR_SLUGS[image.mediaType]}/${artist.slug}`}
      >
        {capitalizeWord(image.mediaType)}
        &nbsp;by&nbsp;
        {artist.firstName}
        {artist.lastName !== "" && " " + artist.lastName}
      </Link>
      .
    </figcaption>
  );
};

const mapStateToProps = state => ({
  users: state.users.users,
});

export default connect(mapStateToProps)(
  injectSheet(styles)(ArticleMediaCaption),
);
