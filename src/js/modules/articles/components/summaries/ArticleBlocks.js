import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import injectSheet from "react-jss";
import { Row, Col } from "react-bootstrap/lib";

import { getMedia } from "../../../media/selectors";

const styles = {
  ArticleBlocks: {},
  articleBlock: {
    borderRight: "solid 1px #ddd",
    height: "174px",
    overflow: "hidden",
    padding: "0 5px 16px",
    "&:last-child": {
      borderRight: "none",
      paddingRight: 0,
    },
    "&:first-child": {
      paddingLeft: "0",
    },
  },
  titleWithImage: {
    color: "#000",
    display: "block",
    fontFamily: "Minion Pro",
    fontSize: "14px",
    lineHeight: "1",
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
  titleWithoutImage: {
    color: "#000",
    display: "block",
    fontFamily: "Canela",
    fontSize: "16px",
    fontWeight: "300",
    lineHeight: "1.38",
    marginBottom: "2px",
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
    marginBottom: "7.8px",
    width: "166px",
    "& img": {
      width: "100%",
    },
  },
  preview: {
    color: "#000",
    fontFamily: "Minion Pro",
    fontSize: "14px",
    lineHeight: "1.29",
  },
};

const ArticleBlocks = ({ classes, articles, sections, media }) => {
  return (
    <Row className={classes.ArticleBlocks}>
      {articles.map(article => {
        const featuredMedia = Object.values(media).find(mediaObject => {
          return mediaObject.isFeatured && mediaObject.articleId === article.id;
        });
        if (featuredMedia) {
          return (
            <Col
              md={2}
              lg={2}
              className={classes.articleBlock}
              key={article.id}
            >
              <figure className={classes.figure}>
                <img src={featuredMedia.url} />
              </figure>
              <Link
                to={`${sections[article.sectionId].permalink}/${article.slug}`}
                className={classes.titleWithImage}
              >
                {article.title}
              </Link>
            </Col>
          );
        } else {
          return (
            <Col
              md={2}
              lg={2}
              className={classes.articleBlock}
              key={article.id}
            >
              <Link
                to={`${sections[article.sectionId].permalink}/${article.slug}`}
                className={classes.titleWithoutImage}
              >
                {article.title}
              </Link>
              <p className={classes.preview}>
                Unfortunately, all good things must come to an end. We came into
                Stuyvesant last September, saved from the unstructured summer.
              </p>
            </Col>
          );
        }
      })}
    </Row>
  );
};

const mapStateToProps = state => ({
  media: getMedia(state),
});

export default connect(mapStateToProps)(injectSheet(styles)(ArticleBlocks));
