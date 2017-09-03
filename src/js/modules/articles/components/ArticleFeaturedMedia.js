import React from "react";
import injectSheet from "react-jss";
import { Link } from "react-router-dom";
import { MEDIA_CREATOR_SLUG } from "../../../constants";
import { capitalizeWord } from "../../../utils";

const styles = {
  figure: {
    margin: "0",
    width: "100%",
  },
  img: {
    width: "100%",
  },
  caption: {
    fontFamily: "Minion Pro",
    fontSize: "14px",
    lineHeight: "1.07",
    marginTop: "7px",
  },
  creditLine: {
    color: "#888",
  },
};

const ArticleFeaturedMedia = ({ classes, featuredMedia, isCaption }) => {
  const { creator } = featuredMedia;
  return (
    <figure className={classes.figure}>
      <img className={classes.img} src={featuredMedia.url} />
      {isCaption && (
        <figcaption className={classes.caption}>
          <span>{featuredMedia.caption}&nbsp;</span>
          <Link
            className={classes.creditLine}
            to={`/${MEDIA_CREATOR_SLUG[featuredMedia.type]}/${creator.slug}`}
          >
            {capitalizeWord(featuredMedia.type)}
            &nbsp;by&nbsp;
            {`${creator.firstName} ${creator.lastName}`}
          </Link>
          .
        </figcaption>
      )}
    </figure>
  );
};

export default injectSheet(styles)(ArticleFeaturedMedia);
