import React from "react";
import { graphql } from "react-apollo";
import gql from "graphql-tag";
import humps from "humps";

import ArticleList from "./ArticleList";
import { ARTICLE_PAGINATES_PER } from "../constants";

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

const ArticleFeed = ({
  loading,
  latestArticles,
  loadMoreEntries,
  title = "Latest",
}) => {
  if (loading) {
    return null;
  }

  latestArticles = humps.camelizeKeys(latestArticles);
  return (
    <div>
      <ArticleList articles={latestArticles} title={title} label="Articles" />
      <button onClick={loadMoreEntries}>load more</button>
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
  props: ({ data: { loading, latestArticles, fetchMore } }) => ({
    loading,
    latestArticles,
    loadMoreEntries: () => {
      return fetchMore({
        variables: {
          page: Math.floor(latestArticles.length / ARTICLE_PAGINATES_PER) + 1,
        },
        updateQuery: (previousResult, { fetchMoreResult }) => {
          if (!fetchMoreResult) {
            return previousResult;
          }
          return {
            ...previousResult,
            latestArticles: [
              ...previousResult.latestArticles,
              ...fetchMoreResult.latestArticles,
            ],
          };
        },
      });
    },
  }),
})(ArticleFeed);
