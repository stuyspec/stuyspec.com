import React from "react";
import { connect } from "react-redux";
import injectSheet from "react-jss";
import { Grid, Row, Col } from "react-bootstrap/lib";
import { Link } from "react-router-dom";

import ArticleHeader from "./ArticleHeader";
import ArticleBody from "./ArticleBody";
import RecommendedRow from "./RecommendedRow";
import CommentThread from "../../comments/components/CommentThread";
import {
  getArticleFromRequestedSlug,
  getArticleFeaturedMedia,
} from "../selectors";

const styles = {
  ArticlePage: {
    borderTop: "solid 1px #000",
    margin: "78px auto 0",
    width: "1066px",
  },
  descriptionRow: {
    marginBottom: "24px",
  },
  description: {
    borderBottom: "solid 1px #ddd",
    color: "#000",
    fontFamily: "Minion Pro",
    fontSize: "16px",
    padding: "12px 0 13px",
  },
  subscribe: {
    color: "#3572b7",
    "&:active": {
      color: "#3572b7",
    },
    "&:focus": {
      color: "#3572b7",
    },
    "&:hover": {
      color: "#3572b7",
    },
  },
  recommendedText: {
    color: "#000",
    fontFamily: "Minion Pro",
    fontSize: "12px",
    marginBottom: "12px",
    textTransform: "uppercase",
  },
};

const ArticlePage = ({ classes, article, section, featuredMedia }) => {
  return (
    <Grid className={classes.ArticlePage}>
      <ArticleHeader article={article} section={section} />
      <ArticleBody content={article.content} featuredMedia={featuredMedia} />
      <Row className={classes.descriptionRow}>
        <Col md={8} lg={8} className={classes.description}>
          The Pulse of the Student Body:&nbsp;
          <Link
            to={"/maybe-we-should-pop-up-the-subscribe-modal"}
            className={classes.subscribe}
          >
            Subscribe
          </Link>
          &nbsp;to <em>The Stuyvesant Spectator</em>’s biweekly newsletter.
        </Col>
        <Col md={4} lg={4} />
      </Row>
      <Row>
        <p className={classes.recommendedText}>Recommended</p>
      </Row>
      <RecommendedRow section={section} />
      <CommentThread article={article} />
    </Grid>
  );
};

const mapStateToProps = (state, ownProps) => ({
  article: getArticleFromRequestedSlug(state, ownProps),
  featuredMedia: getArticleFeaturedMedia(state, ownProps),
});

export default connect(mapStateToProps)(injectSheet(styles)(ArticlePage));
