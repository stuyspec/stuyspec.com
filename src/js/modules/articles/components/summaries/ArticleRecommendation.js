import React from "react";
import injectSheet from "react-jss";
import { Link } from "react-router-dom";

const styles = {
  label: {
    color: "#000",
    display: "block",
    fontFamily: "Circular Std",
    fontSize: "12px",
    fontWeight: "300",
    marginBottom: "3px",
    textTransform: "uppercase",
  },
  summary: {
    color: "#000",
    fontFamily: "Minion Pro",
    fontSize: "14px",
    fontWeight: "300",
    lineHeight: "1.29",
  },
  titleWithImage: {
    color: "#000",
    fontFamily: "Minion Pro",
    fontSize: "14px",
    lineHeight: "1.21",
    "&:hover, &:active, &:focus": {
      color: "#000",
    },
  },
  titleWithoutImage: {
    color: "#000",
    display: "block",
    fontFamily: "Canela",
    fontSize: "19px",
    lineHeight: "1.38",
    marginBottom: "2px",
    "&:hover, &:active, &:focus": {
      color: "#000",
    },
  },
  figure: {
    marginBottom: "4.1px",
    maxHeight: "170px",
    overflow: "hidden",
    width: "100%",
    "& img": {
      width: "100%",
    },
  },
  ArticleRecommendation: {
    float: "left",
    padding: "0 7px 0",
    width: "25%",
    "&:first-child": {
      paddingLeft: 0,
    },
    "&:last-child": {
      paddingRight: 0,
    },
  },
  "@media (max-width: 767px)": {
    figure: {
      maxHeight: "270px",
    },
  },
  "@media (max-width: 575px)": {
    ArticleRecommendation: {
      width: "50%",
      marginBottom: "7px",
    },
  },
};

const ArticleRecommendation = ({ classes, article }) => {
  const { section } = article;
  const image = article.media[0];
  return (
    <div className={classes.ArticleRecommendation}>
      {image && (
        <Link to={`${section.permalink}/${article.slug}`}>
          <figure className={classes.figure}>
            <img src={image.mediumAttachmentUrl} />
          </figure>
        </Link>
      )}
      <Link to={section.permalink} className={classes.label}>
        {section.name}
      </Link>
      <Link
        to={`${section.permalink}/${article.slug}`}
        className={image ? classes.titleWithImage : classes.titleWithoutImage}
      >
        {article.title}
      </Link>
      {!image && <p className={classes.summary}>{article.summary}</p>}
    </div>
  );
};

export default injectSheet(styles)(ArticleRecommendation);
