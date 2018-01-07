import React from "react";
import Col from "react-bootstrap/lib/Col";
import injectSheet from "react-jss";
import { Link } from "react-router-dom";

const styles = {
  ArticleRecommendation: {
    marginBottom: "12px",
  },
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
    marginBottom: "4px",
    overflow: "hidden",
    width: "100%",
    "& img": {
      width: "100%",
    },
  },
};

const ArticleRecommendation = ({ classes, article }) => {
  const { section } = article;
  const image = article.media[0];
  return (
    <Col xs={12} sm={6} md={6} lg={6} className={classes.ArticleRecommendation}>
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
        className={classes.titleWithoutImage}
      >
        {article.title}
      </Link>
      <p className={classes.summary}>{article.summary}</p>
    </Col>
  );
};

export default injectSheet(styles)(ArticleRecommendation);
