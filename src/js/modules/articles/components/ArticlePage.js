import React from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import injectSheet from "react-jss";
import { Grid, Row, Col } from "react-bootstrap/lib";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";

import ArticleHeader from "./ArticleHeader";
import ArticleBody from "./ArticleBody";
import RecommendedRow from "./RecommendedRow";
import CommentThread from "../../comments/components/CommentThread";
import NotFoundPage from "../../core/components/NotFoundPage";
import {
  getArticleFromRequestedSlug,
  getArticleFeaturedMedia,
} from "../selectors";
import { openSubscriptionModal } from "../../accounts/actions";

const styles = {
  ArticlePage: {
    marginTop: "80px",
  },
  descriptionRow: {
    marginBottom: "24px",
  },
  description: {
    border: "1px solid #ddd",
    borderStyle: "solid none", // only top-bottom borders
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
      cursor: "pointer",
    },
  },
  "@media (max-width: 1199px)": {
    ArticlePage: {
      padding: "0 8%",
    },
  },
  "@media (max-width: 991px)": {
    ArticlePage: {
      padding: 0,
    },
    descriptionRow: {
      padding: "0 10%",
    },
  },
  "@media (max-width: 767px)": {
    descriptionRow: {
      padding: "0 2%",
    },
  },
};

const ArticlePage = ({ classes, article, section, featuredMedia, openSubscriptionModal }) => {
  if (!article){
    return <NotFoundPage />;
  }
  return (
    <Grid fluid className={classes.ArticlePage}>
      <Helmet titleTemplate="%s | The Stuyvesant Spectator">
        <title>{article.title}</title>
        <meta />
      </Helmet>
      <ArticleHeader article={article} section={section} />
      <ArticleBody content={article.content} featuredMedia={featuredMedia} />
      <Row className={classes.descriptionRow}>
        <Col xs={12} sm={12} md={9} lg={9} className={classes.description}>
          The Pulse of the Student Body:&nbsp;
          <span
            className={classes.subscribe}
            onClick={openSubscriptionModal}
          >
            Subscribe
          </span>
          &nbsp;to <em>The Stuyvesant Spectator</em>’s biweekly newsletter.
        </Col>
        <Col xsHidden smHidden md={3} lg={3} />
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

const mapDispatchToProps = dispatch => {
  return bindActionCreators({ openSubscriptionModal }, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(injectSheet(styles)(ArticlePage));
