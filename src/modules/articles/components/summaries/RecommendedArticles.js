import React from "react";
import { Link } from "react-router-dom";
import { graphql } from "react-apollo";
import gql from "graphql-tag";
import injectSheet from "react-jss";

const RecommendedArticlesQuery = gql`
  query RecommendedArticlesQuery($limit: Int!) {
    topRankedArticles(limit: $limit) {
      id
      title
      slug
      preview
      section {
        id
        permalink
      }
    }
  }
`;

const styles = {
  RecommendedArticles: {
    padding: "0 0 10px 7px",
  },
  label: {
    borderBottom: "1px solid #ddd",
    color: "#000",
    display: "block",
    fontFamily: "Circular Std",
    fontSize: "1em",
    fontWeight: 300,
    margin: 0,
    padding: "4px 0",
    "&:hover, &:active, &:focus": {
      color: "#000",
    },
  },
  numberLabel: {
    color: "#000",
    float: "left",
    fontFamily: "Circular Std",
    fontSize: "13px",
    fontWeight: 300,
    margin: 0,
    lineHeight: 1,
  },
  articleItem: {
    padding: "12px 0 12px 12px",
    "&:not(:last-child)": {
      borderBottom: "solid 1px #ddd",
    },
  },
  articleSummary: {
    paddingLeft: "21px",
  },
  title: {
    color: "#000",
    display: "block",
    fontFamily: "Minion Pro",
    fontSize: "1.1em",
    fontWeight: "bold",
    lineHeight: "1.1em",
    marginBottom: "8px",
    "&:hover, &:active, &:focus": {
      color: "#000",
    },
  },
  preview: {
    color: "#000",
    fontFamily: "Minion Pro",
    fontSize: "1.1em",
    lineHeight: 1.21,
    margin: 0,
  },
};

const RecommendedArticles = ({ classes, data }) => {
  if (data.loading) {
    return null;
  }
  const { topRankedArticles } = data;
  return (
    <div className={classes.RecommendedArticles}>
      <Link to="/recommended" className={classes.label}>
        Recommended
      </Link>
      {topRankedArticles.map((article, index) => {
        return (
          <div className={classes.articleItem} key={article.id}>
            <p className={classes.numberLabel}>{index + 1}.</p>
            <div className={classes.articleSummary}>
              <Link
                className={classes.title}
                to={`${article.section.permalink}/${article.slug}`}
              >
                {article.title}
              </Link>
              <p className={classes.preview}>{article.preview}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default graphql(RecommendedArticlesQuery, {
  options: ({ limit }) => ({ variables: { limit: limit || 4 } }),
  // if limit not given as prop, we use 4 as the default.
})(injectSheet(styles)(RecommendedArticles));
