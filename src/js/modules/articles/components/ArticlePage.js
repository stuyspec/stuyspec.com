import React from "react";
import { compose } from "redux";
import { graphql } from "react-apollo";
import gql from "graphql-tag";
import humps from "humps";
import injectSheet from "react-jss";
import Grid from "react-bootstrap/lib/Grid";
import Row from "react-bootstrap/lib/Row";
import Col from "react-bootstrap/lib/Col";
import { Helmet } from "react-helmet";
import { toRoman } from "roman-numerals";
import { SPEC_REFERENCE_PATTERN } from "../../../constants";
import ArticleHeader from "./ArticleHeader";
import ArticleBody from "./ArticleBody";
import RecommendedRow from "./RecommendedRow";
import CommentThread from "../../comments/components/CommentThread";
import NotFoundPage from "../../core/components/NotFoundPage";

const ArticleQuery = gql`
  query ArticleQuery($slug: String!) {
    articleBySlug(slug: $slug) {
      id
      title
      content
      media {
        id
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
        id
        name
        permalink
        parent_section {
          id
          name
          permalink
        }
      }
    }
  }
`;

const styles = {
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

const ArticlePage = ({ classes, data }) => {
  if (data.loading) {
    return null;
  }
  data = humps.camelizeKeys(data);
  const { articleBySlug } = data;
  const { section } = articleBySlug;

  return (
    <Grid fluid className={classes.ArticlePage}>
      <Helmet titleTemplate="%s | The Stuyvesant Spectator">
        <title>{articleBySlug.title}</title>
        <meta />
      </Helmet>
      <ArticleHeader article={articleBySlug} section={section} />
      <ArticleBody
        article={articleBySlug}
        // the referencedId is passed as a prop so ArticleBody can send a
        // GraphQL query for the referenced article.
      />
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
      <RecommendedRow section={section.parentSection || section} />
      <CommentThread articleId={articleBySlug.id} />
    </Grid>
  );
};

export default compose(
  graphql(ArticleQuery, {
    options: ({ match }) => ({
      variables: { slug: match.params.article_slug },
    }),
  }),
  injectSheet(styles),
)(ArticlePage);
