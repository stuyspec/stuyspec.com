import React from "react";
import { compose } from "redux";
import { graphql } from "react-apollo";
import gql from "graphql-tag";
import humps from "humps";
import { Row, Col } from "react-bootstrap";
import injectSheet from "react-jss";

import { TallAd } from "../../advertisements/components";
import { LoadingIcon } from "../../core/icons";
import ArticleList from "./ArticleList";

const styles = {
  articleList: {
    paddingRight: "14px !important",
  },
  tallAdContainer: {
    paddingLeft: "14px !important",
    borderLeft: "solid 1px #ddd",
  },
};

const SearchResultsQuery = gql`
  query SearchResultsQuery($query: String!) {
    searchArticles(query: $query) {
      searchable {
        id
        title
        summary
        slug
        created_at
        media {
          attachment_url
          title
        }
        section {
          permalink
        }
        contributors {
          first_name
          last_name
        }
      }
    }
  }
`;

const SearchResults = ({ classes, data }) => {
  if (data.loading) {
    return (
      <LoadingIcon />
    );
  }
  data = humps.camelizeKeys(data);

  const articles = data.searchArticles.map(article => article.searchable);

  return (
    <Row>
      <Col xs={12} sm={12} md={9} lg={9} className={classes.articleList}>
        <ArticleList
          articles={articles}
          title={`${articles.length} results`}
          label="Articles"
        />
      </Col>
      <Col xsHidden smHidden md={3} lg={3} className={classes.tallAdContainer}>
        <TallAd />
      </Col>
    </Row>
  );
};

export default compose(graphql(SearchResultsQuery), injectSheet(styles))(
  SearchResults,
);
