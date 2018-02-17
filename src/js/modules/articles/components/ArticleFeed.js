import React from "react";
import { Grid } from "react-bootstrap/lib";
import { graphql } from "react-apollo";
import gql from "graphql-tag";
import humps from "humps";

import ArticleList from "./ArticleList";

const ArticleFeedQuery = gql`
  query ArticleFeedQuery($section_id: ID, $page: Int) {
    latestArticles(section_id: $section_id, page: $page) {
      id
      title
      slug
      preview
      created_at
      section {
        id
        permalink
      }
      contributors {
        first_name
        last_name
        slug
      }
      media {
        title
        media_type
        attachment_url
        medium_attachment_url
        thumb_attachment_url
      }
    }
  }
`;

const ArticleFeed = ({ loading, page, latestArticles, loadMoreEntries, title = "Latest" }) => {
  if (loading) {
    return null;
  }

  latestArticles = humps.camelizeKeys(latestArticles);
  console.log(page, latestArticles);
  return (
    <div>
      <button onClick={loadMoreEntries}>load more</button>
      <ArticleList articles={latestArticles} title={title} label="Articles" />
    </div>
  );
};

export default graphql(ArticleFeedQuery, {
  options: ({ section }) => ({
    variables: {
      section_id: section ? section.id : null,
      page: 1,
    },
  }),
  props: ({ data: { loading, latestArticles, fetchMore, variables }}) => ({
    loading,
    latestArticles,
    page: variables.page + 1,
    loadMoreEntries: () => {
      return fetchMore({
        variables: {
          page: variables.page + 1,
        },
        updateQuery: (previousResult, { fetchMoreResult }) => {
          if (!fetchMoreResult) { return previousResult; }
          return {
            ...previousResult,
            latestArticles: [ ...previousResult.latestArticles, ...fetchMoreResult.latestArticles ],
          };
        },
      });
    }
  })
})(ArticleFeed);
