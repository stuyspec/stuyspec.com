import React from "react";
import { connect } from "react-redux";
import { Row, Col } from "react-bootstrap/lib";
import { Link } from "react-router-dom";
import injectSheet from "react-jss";

import { getMedia } from "../../media/selectors";
import { getSections } from "../../sections/selectors";
import { getUsers } from "../../users/selectors";
import Byline from "./Byline";
import ArticleFeaturedMedia from "./ArticleFeaturedMedia";

const styles = {
  ArticleRow: {
    margin: 0,
  },
  articleTitle: {
    display: "block",
    fontFamily: "Canela",
    fontSize: "20px",
    fontWeight: "300",
    color: "#000",
    lineHeight: "1.2",
    marginBottom: "4px",
    padding: 0,
    "&:hover": {
      color: "#000",
    },
  },
  articlePreview: {
    color: "#000",
    fontFamily: "Minion Pro",
    fontSize: "15px",
    lineHeight: "1.2",
    marginBottom: "6px",
  },
  Byline: {
    color: "#000",
    display: "block",
    fontFamily: "Circular Std",
    fontSize: "12px",
    fontWeight: "300",
    "& p": {
      display: "inline",
      margin: 0,
      "& a": {
        color: "#000",
        "&:hover": {
          color: "#000",
        },
      },
    },
  },
  dateline: {
    fontFamily: "Circular Std",
    fontSize: "12px",
    fontWeight: "bold",
    color: "#666",
  },
  featuredMediaContainer: {
    float: "left",
    marginRight: "14px",
    width: "166px",
  },
  rowBlock: {
    borderBottom: "solid 1px #ddd",
    padding: "14px 0",
  },
  rowContent: {
    overflow: "hidden",
  },
};

const ArticleRow = ({ classes, article, sections, users, media }) => {
  const section = sections[article.sectionId];
  const featuredMedia = Object.values(media).find(media => {
    return media.isFeatured && media.articleId === article.id;
  });
  if (featuredMedia) {
    featuredMedia.creator = users[featuredMedia.userId];
  }
  return (
    <Row key={article.id} className={classes.ArticleRow}>
      <Col md={7} lg={7} className={classes.rowBlock}>
        {featuredMedia && (
          <div className={classes.featuredMediaContainer}>
            <ArticleFeaturedMedia featuredMedia={featuredMedia} />
          </div>
        )}
        <div className={classes.rowContent}>
          <Link
            to={`${section.permalink}/${article.slug}`}
            className={classes.articleTitle}
          >
            {article.title}
          </Link>
          <p className={classes.articlePreview}>
            Unfortunately, all good things must come to an end. We came into
            Stuyvesant last September, saved from the unstructured summer.
          </p>
          <Byline classes={classes} contributors={article.contributors} />
        </div>
      </Col>
      <Col md={5} lg={5} />
    </Row>
  );
};

const mapStateToProps = state => ({
  media: getMedia(state),
  sections: getSections(state),
  users: getUsers(state),
});

export default connect(mapStateToProps)(injectSheet(styles)(ArticleRow));
