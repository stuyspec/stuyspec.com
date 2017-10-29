import React from "react";
import injectSheet from "react-jss";
import Row from "react-bootstrap/lib/Row";
import Col from "react-bootstrap/lib/Col";

import ArticleFeaturedMedia from "./ArticleFeaturedMedia";
import RightRail from "./RightRail";

const styles = {
  ArticleBody: {
    borderBottom: "1px solid #ddd",
    color: "#000",
    fontFamily: "Minion Pro",
    fontSize: "18px",
    lineHeight: 1.44,
    padding: "0 0 18px",
    "& p": {
      marginBottom: "20px",
    },
    "& p:first-child": {
      marginTop: "28px",
    },
    "& p:first-child::first-letter": {
      float: "left",
      fontSize: "58px",
      lineHeight: "43px",
      padding: "7px 6px 0px 3px",
    },
  },
  content: {
    marginTop: "13px",
  },
};

const ArticleBody = ({ classes, content, featuredMedia }) => {
  return (
    <Row>
      <Col md={8} lg={8} className={classes.ArticleBody}>
        {featuredMedia && (
          <ArticleFeaturedMedia
            featuredMedia={featuredMedia}
            isCaption={true}
          />
        )}
        <div dangerouslySetInnerHTML={{ __html: content }} />
      </Col>
      <Col md={1} lg={1} />
      <Col md={3} lg={3}>
        <RightRail />
      </Col>
    </Row>
  );
};

export default injectSheet(styles)(ArticleBody);
