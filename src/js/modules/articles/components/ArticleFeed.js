import React from "react";
import { graphql } from "react-apollo";
import gql from "graphql-tag";
import humps from "humps";
import injectSheet from "react-jss";

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

const styles = {
  ArticleFeed: {
    marginBottom: "36px",
  },
  buttonContainer: {
    display: "flex",
    width: "100%",
    justifyContent: "center",
  },
  loadMoreButton: {
    background: "#9dba73",
    borderRadius: "3px",
    color: "#fff",
    fontFamily: "Canela",
    border: "none",
    padding: "12px 16px",
    fontSize: "16px",
    cursor: "pointer",
  },
};

const ArticleFeed = ({
  classes,
  loading,
  latestArticles,
  loadMoreEntries,
  areMoreArticles,
  title = "Latest",
}) => {
  if (loading) {
    return null;
  }

  latestArticles = humps.camelizeKeys(latestArticles);
  return (
    <div className={classes.ArticleFeed}>
      <ArticleList articles={latestArticles} title={title} label="Articles" />
      {areMoreArticles && (
        <div className={classes.buttonContainer}>
          <button className={classes.loadMoreButton} onClick={loadMoreEntries}>
            Load More
          </button>
        </div>
      )}
    </div>
  );
};

export default graphql(ArticleFeedQuery, {
  // options uses props to compute how a query is fetched.
  options: ({ section }) => ({
    variables: {
      // ArticleFeed is both used on SectionPage's and the LatestPage.
      section_id: section ? section.id : null,

      // We start on page 1 of articles
      page: 1,
    },
  }),
  props: ({ data: { loading, latestArticles, fetchMore } }) => ({
    loading,
    latestArticles,
    areMoreArticles: true,
    loadMoreEntries: () => {
      return fetchMore({
        variables: {
          page: Math.floor(latestArticles.length / ARTICLE_PAGINATES_PER) + 1,
        },
        updateQuery: (previousResult, { fetchMoreResult }) => {
          if (!fetchMoreResult || fetchMoreResult.latestArticles.length === 0) {
            return {
              ...previousResult,
              areMoreArticles: false,
            };
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
})(injectSheet(styles)(ArticleFeed));
