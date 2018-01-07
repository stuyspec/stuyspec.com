import React from "react";
import { Link } from "react-router-dom";
import injectSheet from "react-jss";
import Row from "react-bootstrap/lib/Row";
import Col from "react-bootstrap/lib/Col";

import Byline from "../Byline";
import Dateline from "../Dateline";

const styles = {
  RightTitleArticle: {
    borderTop: "1px solid #ddd",
    borderBottom: "1px solid #ddd",
    padding: "26px 0 26px 0",
  },
  featuredMedia: {
    "& figure": {
      margin: 0,
      maxHeight: "500px",
      overflow: "hidden",
      width: "100%",
      "& img": {
        width: "100%",
      },
    },
  },
  article: {
    marginLeft: "55px",
    paddingTop: "35px",
    textAlign: "center",
    width: "325px",
    "& a": {
      color: "#000",
      "&:hover, &:active, &:focus": {
        color: "#000",
      },
    },
  },
  sectionLink: {
    display: "block",
    fontFamily: "Circular Std",
    fontSize: "13px",
    fontWeight: 300,
    marginBottom: "8px",
    textTransform: "uppercase",
  },
  title: {
    display: "block",
    fontFamily: "Canela",
    fontSize: "40px",
    fontWeight: 300,
    lineHeight: "48px",
    marginBottom: "13px",
  },
  summary: {
    fontFamily: "Minion Pro",
    fontSize: "16px",
    lineHeight: 1.25,
    marginBottom: "18px",
  },
  "@media (max-width: 991px)": {
    article: {
      marginLeft: 0,
      paddingTop: "3vw",
      width: "41.666666%", // col-sm-5
    },
    summary: {
      margin: "0 auto 18px auto",
      width: "80%",
    },
  },
  "@media (max-width: 767px)": {
    featuredMedia: {
      paddingRight: "0 !important",
      "& figure": {
        maxHeight: "50vh",
      },
      "& figure img": {
        marginLeft: "-14px",
        width: "100vw",
      },
    },
    article: {
      padding: "14px 0 0 0 !important",
      width: "100%",
    },
    title: {
      fontSize: "30px",
      lineHeight: "36px",
    },
  },
};

const RightTitleArticle = ({ classes, article }) => {
  const { section } = article;
  return (
    <Row className={classes.RightTitleArticle}>
      {article.media.length > 0 && (
        <Col xs={12} sm={7} md={7} lg={7} className={classes.featuredMedia}>
          <Link to={`${section.permalink}/${article.slug}`}>
            <figure className={classes.featuredMediaContainer}>
              <img src={article.media[0].attachmentUrl} />
            </figure>
          </Link>
        </Col>
      )}
      <Col xs={12} sm={5} md={5} lg={5} className={classes.article}>
        <Link className={classes.sectionLink} to={section.permalink}>
          {section.name === "Arts & Entertainment" ? "A&E" : section.name}
        </Link>
        <Link
          className={classes.title}
          to={`${section.permalink}/${article.slug}`}
        >
          {article.title}
        </Link>
        <p className={classes.summary}>{article.summary}</p>
        <Byline contributors={article.contributors} />
        <Dateline timestamp={article.createdAt} />
      </Col>
    </Row>
  );
};

export default injectSheet(styles)(RightTitleArticle);
