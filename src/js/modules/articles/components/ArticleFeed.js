import React from "react";
import { Grid } from "react-bootstrap/lib";
import { graphql } from "react-apollo";
import gql from "graphql-tag";
import humps from "humps";

import ArticleList from "./ArticleList";

const ArticleFeedQuery = gql`
  query ArticleFeedQuery($section_id: ID) {
    latestArticles(section_id: $section_id, limit: 10) {
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
    },
  })
})(ArticleFeed);