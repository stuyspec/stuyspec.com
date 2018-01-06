import React from "react";
import { Row, Col } from "react-bootstrap/lib";
import { Link } from "react-router-dom";
import injectSheet from "react-jss";

import Byline from "./Byline";
import Dateline from "./Dateline";

const styles = {
  articleBlock: {
    borderBottom: "solid 1px #ddd",
    marginBottom: "22px",
    paddingBottom: "20px",
  },
  DatelineDesktop: {
    color: "#888",
    display: "block",
    fontFamily: "Circular Std",
    fontSize: "13px",
    fontWeight: "300",
    float: "left",
    marginRight: "19px",
    width: "110px",
  },
  DatelineMobile: {
    color: "#888",
    display: "none",
    fontFamily: "Circular Std",
    fontSize: "12px",
    fontWeight: "300",
    marginRight: "19px",
  },
  preview: {
    overflow: "hidden",
  },
  figure: {
    float: "right",
    height: "130px",
    marginLeft: "29px",
    width: "166px",
    "& img": {
      width: "100%",
    },
  },
  title: {
    color: "#000",
    display: "block",
    fontFamily: "Minion Pro",
    fontSize: "24px",
    fontWeight: 700,
    lineHeight: "1.12",
    marginBottom: "5px",
    paddingTop: "2px",
    "&:hover, &:active, &:focus": {
      color: "#000",
    },
  },
  summary: {
    color: "#000",
    fontFamily: "Minion Pro",
    fontSize: "16px",
    lineHeight: "1.25",
    marginBottom: "3px",
  },
  "@media (max-width: 767px)": {
    DatelineDesktop: {
      display: "none",
    },
    DatelineMobile: {
      display: "block",
    },
    preview: {
      overflow: "visible",
    },
    figure: {
      float: "none",
      margin: "0 0 14px 0",
      height: "auto",
      maxHeight: "80vw",
      overflow: "hidden",
      width: "100%",
      "& img": {
        marginLeft: "-14px",
        width: "100vw",
      },
    },
  },
};

const ArticleRow = ({ classes, article }) => {
  const { section } = article;
  const featuredMedia = article.media[0];
  return (
    <Row key={article.id} className={classes.ArticleRow}>
      <div className={classes.articleBlock} key={article.id}>
        <div className={classes.DatelineDesktop}>
          <Dateline timestamp={article.createdAt} />
        </div>
        <div className={classes.preview}>
          {featuredMedia && (
            <Link to={`${section.permalink}/${article.slug}`}>
              <figure className={classes.figure}>
                <img
                  src={featuredMedia.attachmentUrl}
                  alt={`${featuredMedia.mediaType}: ${featuredMedia.title}`}
                />
              </figure>
            </Link>
          )}
          <Link
            to={`${section.permalink}/${article.slug}`}
            className={classes.title}
          >
            {article.title}
          </Link>
          <p className={classes.summary}>{article.summary}</p>
          <Byline contributors={article.contributors} />
          <p className={classes.DatelineMobile}>
            <Dateline timestamp={article.createdAt} />
          </p>
        </div>
      </div>
    </Row>
  );
};

export default injectSheet(styles)(ArticleRow);
