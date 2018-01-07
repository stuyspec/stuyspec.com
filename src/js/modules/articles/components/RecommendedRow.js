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
      media {
        medium_attachment_url
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
      padding: "12px",
    },
    /* recommendedBlocks are structured in the block form
         1  2
         3  4,
       rendering the following padding removals necessary.
     */
    "& > .row > div:nth-child(1), & > .row > div:nth-child(3)": {
      paddingLeft: "0 !important",
    },
    "& > .row > div:nth-child(2), & > .row > div:nth-child(4)": {
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
  "@media (max-width: 768px)": {
    RecommendedRow: {
      padding: "0 2%",
    },
    recommendedList: {
      "& > .row > div": {
        padding: "12px 0 !important",
      },
    },
  },
};

const RecommendedRow = ({ classes, data }) => {
  if (data.loading) {
    return null;
  }
  data = humps.camelizeKeys(data);
  console.log(data);

  const { topRankedArticles } = data;
  return (
    <Row className={classes.RecommendedRow}>
      <p className={classes.recommendedText}>Recommended</p>
      <Col xs={12} sm={12} md={9} lg={9} className={classes.recommendedList}>
        <Row>
          {topRankedArticles.map(article => (
            <ArticleRecommendation key={article.id} article={article} />
          ))}
        </Row>
      </Col>
      <Col xsHidden smHidden md={3} lg={3} />
    </Row>
  );
};

export default graphql(RecommendedRowQuery, {
  options: ({ section }) => ({ variables: { section_id: section.id } }),
})(injectSheet(styles)(RecommendedRow));
