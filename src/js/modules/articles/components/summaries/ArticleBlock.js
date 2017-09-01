import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import injectSheet from "react-jss";

import { getMedia } from "../../../media/selectors";

const styles = {
  ArticleBlock: {
    float: "left",
    height: "59px",
    marginTop: "12px",
    overflow: "hidden",
    paddingRight: "12.5px",
    width: "20%",
    "&:not(:last-child)": {
      borderRight: "solid 1px #ddd",
    },
    "&:not(:first-child)": {
      paddingLeft: "12.5px",
    },
  },
  label: {
    color: "#a8a8a8",
    fontFamily: "Circular Std",
    fontSize: "11px",
    letterSpacing: "0.5px",
    marginBottom: "1px",
    textTransform: "uppercase",
  },
  title: {
    color: "#000",
    display: "block",
    fontFamily: "Minion Pro",
    fontSize: "12px",
    fontWeight: "bold",
    letterSpacing: "0.5px",
    lineHeight: 1.17,
    margin: 0,
    "&:active": {
      color: "#000",
    },
    "&:focus": {
      color: "#000",
    },
    "&:hover": {
      color: "#000",
    },
  },
  figure: {
    float: "left",
    margin: "3px 8px 0 0",
    width: "75px",
    "& img": {
      width: "100%",
    },
  },
};

const ArticleBlock = ({ classes, article, section, media }) => {
  const featuredMedia = Object.values(media).find(mediaObject => {
    return mediaObject.isFeatured && mediaObject.articleId === article.id;
  });
  return (
    <div className={classes.ArticleBlock}>
      {featuredMedia && (
        <div>
          <figure className={classes.figure}>
            <img src={featuredMedia.url} />
          </figure>
        </div>
      )}
      <p className={classes.label}>
        {section.name === "Arts & Entertainment" ? "A&E" : section.name}
      </p>
      <Link
        to={`${section.permalink}/${article.slug}`}
        className={classes.title}
      >
        {article.title}
      </Link>
    </div>
  );
};

const mapStateToProps = state => ({
  media: getMedia(state),
});

export default connect(mapStateToProps)(injectSheet(styles)(ArticleBlock));
