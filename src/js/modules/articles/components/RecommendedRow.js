/* Row of recommended articles on the bottom of the Article Page */

import React from "react";
import injectSheet from "react-jss";
import { Row, Col } from "react-bootstrap/lib";
import { graphql } from "react-apollo";
import gql from "graphql-tag";
import humps from "humps";

import { ArticleRecommendation } from "./summaries";

const RecommendedRowQuery = gql`
  query RecommendedRowQuery($section_id: ID!) {
    topRankedArticles(section_id: $section_id, limit: 4) {
      id
      title
      slug
      summary
      created_at
      contributors {
        first_name
        last_name
      }
      media {
        attachment_url
      }
      section {
        id
        name
        permalink
      }
    }
  }
`;

const styles = {
  RecommendedRow: {
    padding: 0,
    marginBottom: "24px",
  },
  recommendedList: {
    borderBottom: "solid 1px #ddd",
    padding: "0 0 24px",
    "& > .row > div": {
      padding: "18px !important",
    },
    "& > .row > div:first-child": {
      paddingLeft: "0 !important",
    },
    "& > .row > div:last-child": {
      paddingRight: "0 !important",
    },
  },
  recommendedText: {
    color: "#000",
    fontFamily: "Minion Pro",
    fontSize: "12px",
    marginBottom: "12px",
    textTransform: "uppercase",
  },
  "@media (max-width: 991px)": {
    RecommendedRow: {
      padding: "0 10%",
    },
  },
  "@media (max-width: 767px)": {
    RecommendedRow: {
      padding: "0 2%",
    },
    recommendedList: {
      "& > .row > div": {
        padding: "0px !important",
        marginBottom: "38px",
      },
    },
  },
};

const RecommendedRow = ({ classes, data }) => {
  if (data.loading) {
    return null;
  }
  data = humps.camelizeKeys(data);

  const { topRankedArticles } = data;
  return (
    <Row className={classes.RecommendedRow}>
      <p className={classes.recommendedText}>Recommended</p>
      <Col xs={12} sm={12} md={12} lg={12} className={classes.recommendedList}>
        <Row>
          {topRankedArticles
            .slice(0, 2)
            .map(article => (
              <ArticleRecommendation key={article.id} article={article} />
            ))}
        </Row>
        <Row>
          {topRankedArticles
            .slice(2, 4)
            .map(article => (
              <ArticleRecommendation key={article.id} article={article} />
            ))}
        </Row>
      </Col>
    </Row>
  );
};

export default graphql(RecommendedRowQuery, {
  options: ({ section }) => ({ variables: { section_id: section.id } }),
})(injectSheet(styles)(RecommendedRow));
