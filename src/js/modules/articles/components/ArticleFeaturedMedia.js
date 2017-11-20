import React from "react";
import injectSheet from "react-jss";
import { Link } from "react-router-dom";

import { MEDIA_CREATOR_SLUGS } from "../../../constants";
import { capitalizeWord } from "../../../utils";

const styles = {
  figure: {
    margin: 0,
    width: "100%",
  },
  tallFigure: {
    float: "left",
    marginTop: "28px !important",
    marginBottom: "8px",
    paddingRight: "3.5% !important",
    width: "45%",
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
  "@media (max-width: 767px)": {
    tallFigure: {
      "& img": {
        marginLeft: "0 !important",
        width: "100% !important",
      },
    },
  },
};

const ArticleFeaturedMedia = ({ classes, featuredMedia, isCaption }) => {
  const { creator } = featuredMedia;

  let figureIsTall = false;
  const img = new Image();
  img.src = featuredMedia.attachmentUrl;
  img.onload = () => (figureIsTall = true); //img.height > img.width * 1.2;
  figureIsTall = true;
  console.log(figureIsTall);

  return (
    <figure className={figureIsTall ? classes.tallFigure : classes.figure}>
      <img className={classes.img} src={featuredMedia.attachmentUrl} />
      {isCaption && (
        <figcaption className={classes.caption}>
          <span>{featuredMedia.caption}&nbsp;</span>
          <Link
            className={classes.creditLine}
            to={`/${MEDIA_CREATOR_SLUGS[
              featuredMedia.mediaType
            ]}/${creator.slug}`}
          >
            {capitalizeWord(featuredMedia.mediaType)}
            &nbsp;by&nbsp;
            {creator.firstName}
            {creator.lastName !== "" && " " + creator.lastName}
          </Link>
          .
        </figcaption>
      )}
    </figure>
  );
};

export default injectSheet(styles)(ArticleFeaturedMedia);
