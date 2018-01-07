import React from "react";
import injectSheet from "react-jss";
import { Row, Col } from "react-bootstrap/lib";
import { Link } from "react-router-dom";
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
  },
  "@media (max-width: 575px)": {
    recommendedList: {
      /* recommendedBlocks are structured in a block form,
           1  2
           3  4,
         rendering these next padding removals necessary.
       */
      "& > div:nth-child(2)": {
        paddingRight: "0 !important",
      },
      "& > div:nth-child(3)": {
        paddingLeft: "0 !important",
      },
    },
  },
};

const RecommendedRow = ({ classes, data, section }) => {
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
        {topRankedArticles.map(article => <ArticleRecommendation key={article.id} article={article} />)}
      </Col>
      <Col xsHidden smHidden md={3} lg={3} />
    </Row>
  );
};

export default graphql(RecommendedRowQuery, {
  options: ({ section }) => ({ variables: { section_id: section.id } }),
})(injectSheet(styles)(RecommendedRow));
