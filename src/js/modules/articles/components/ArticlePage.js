import React from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { graphql } from "react-apollo";
import gql from "graphql-tag";
import humps from "humps";
import injectSheet from "react-jss";
import { Grid, Row, Col } from "react-bootstrap/lib";
import { Helmet } from "react-helmet";
import { toRoman } from "roman-numerals";
import { withRouter } from "react-router";

import ArticleHeader from "./ArticleHeader";
import ArticleBody from "./ArticleBody";
import RecommendedRow from "./RecommendedRow";
import CommentThread from "../../comments/components/CommentThread";
import NotFoundPage from "../../core/components/NotFoundPage";
import { getArticleFromRequestedSlug, getArticleMedia } from "../selectors";
import { openSubscriptionModal } from "../../accounts/actions";

const styles = {
  ArticlePage: {
    marginTop: "80px",
  },
  description: {
    border: "1px solid #ddd",
    borderStyle: "solid none", // only top-bottom borders
    color: "#000",
    fontFamily: "Minion Pro",
    fontSize: "16px",
    marginBottom: "24px",
    padding: "12px 0 13px",
  },
  subscribe: {
    color: "#3572b7",
    "&:hover, &:focus, &:active": {
      color: "#3572b7",
    },
    "&:hover": {
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

const ArticlePage = ({ classes, data, openSubscriptionModal }) => {
  data = humps.camelizeKeys(data);
  const { loading, articleBySlug } = data;
  if (loading) return null;

  const { section } = articleBySlug;
  return (
    <Grid fluid className={classes.ArticlePage}>
      <Helmet titleTemplate="%s | The Stuyvesant Spectator">
        <title>{articleBySlug.title}</title>
        <meta />
      </Helmet>
      <ArticleHeader article={articleBySlug} section={section} />
      <ArticleBody article={articleBySlug} media={articleBySlug.media} />
      <Row className={classes.descriptionRow}>
        <Col xs={12} sm={12} md={9} lg={9} className={classes.description}>
          This article was published in&nbsp;
          <a
            className={classes.subscribe}
            href="https://issuu.com/stuyspectator/docs"
            target="_blank"
          >
            {`Volume ${toRoman(
              articleBySlug.volume,
            )}, Issue ${articleBySlug.issue}`}
          </a>
          .
        </Col>
        <Col xsHidden smHidden md={3} lg={3} />
      </Row>
      <RecommendedRow
        section={section.parent_section ? section.parent_section : section}
      />
      <CommentThread article={articleBySlug} />
    </Grid>
  );
};

const mapDispatchToProps = dispatch => {
  return bindActionCreators({ openSubscriptionModal }, dispatch);
};

const ArticleBySlug = gql`
  query ArticleQuery($slug: String!) {
    articleBySlug(slug: $slug) {
      title
      content
      media {
        attachment_url
        media_type
        caption
        title
        user {
          first_name
          last_name
          slug
        }
      }
      created_at
      volume
      issue
      contributors {
        first_name
        last_name
        slug
      }
      section {
        name
        permalink
        parent_section {
          name
          permalink
        }
      }
    }
  }
`;

export default graphql(ArticleBySlug, {
  options: ({ match }) => ({ variables: { slug: match.params.article_slug } }),
})(
  withRouter(
    connect(null, mapDispatchToProps)(injectSheet(styles)(ArticlePage)),
  ),
);
