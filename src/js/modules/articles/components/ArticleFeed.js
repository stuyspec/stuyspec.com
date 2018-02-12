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

const ArticleFeed = ({ data, title }) => {
  if (data.loading) {
    return null;
  }

  data = humps.camelizeKeys(data);
  const { latestArticles } = data;

  return <ArticleList articles={latestArticles} title={title} label="Latest" />
}

export default graphql(ArticleFeedQuery, {
  options: ({ section }) => ({
    variables: {
      section_id: section ? section.id : undefined,
      page: 0,
    },
  }),
  props: ({ data: loading, feed, fetchMore }) => ({
    loading,
    feed,
    loadMoreEntries: () => {
      return fetchMore({
        // query: ... (you can specify a different query. FEED_QUERY is used by default)
        variables: {
          // We are able to figure out which offset to use because it matches
          // the feed length, but we could also use state, or the previous
          // variables to calculate this (see the cursor example below)
          offset: feed.length,
        },
        updateQuery: (previousResult, { fetchMoreResult }) => {
          if (!fetchMoreResult) { return previousResult; }
          return {
            ...previousResult,
            feed: [ ...previousResult.feed, ...fetchMoreResult.feed ],
          };
        },
      });
    }
  })
})(ArticleFeed);