import React from "react";
import { connect } from "react-redux";
import injectSheet from "react-jss";
import { graphql } from "react-apollo";
import gql from "graphql-tag";
import humps from "humps";

import RibbonComponent from "./RibbonComponent";

const LatestArticlesQuery = gql`
  query LatestArticlesQuery($limit: Int!) {
    latestArticles(limit: $limit) {
      id
      title
      slug
      summary
      media {
        thumb_attachment_url
      }
      section {
        name
        permalink
      }
    }
  }
`;

const styles = {
  LatestArticlesRibbon: {
    borderTop: "1px solid #ddd",
    borderBottom: "1px solid #ddd",
    fontSize: 0,
    marginBottom: "22px",
  },
  RibbonComponent: {
    display: "inline-block",
    height: "59px",
    marginTop: "9px",
    marginBottom: "11px",
    overflow: "hidden",
    paddingRight: "12.5px",
    width: "20%",
    "&:not(:last-child)": {
      borderRight: "solid 1px #ddd",
    },
    "&:not(:first-child)": {
      paddingLeft: "12.5px",
    },
  },
  sectionLabel: {
    color: "#a8a8a8",
    fontFamily: "Circular Std",
    fontSize: "11px",
    fontWeight: 300,
    letterSpacing: "0.5px",
    marginBottom: "1px",
    textTransform: "uppercase",
    "&:hover": {
      color: "#a8a8a8",
      textDecoration: "none",
    },
    "&:focus": {
      color: "#a8a8a8",
      textDecoration: "none",
    },
  },
  title: {
    color: "#000",
    display: "block",
    fontFamily: "Minion Pro",
    fontSize: "12px",
    fontWeight: "bold",
    letterSpacing: "0.5px",
    lineHeight: 1.17,
    margin: 0,
    "&:hover, &:active, &:focus": {
      color: "#000",
    },
  },
  figure: {
    float: "left",
    margin: "3px 8px 0 0",
    width: "75px",
    "& img": {
      width: "100%",
    },
  },
  "@media (max-width: 991px)": {
    figure: {
      width: "42%",
    },
  },
};

const LatestArticlesRibbon = ({ classes, data, limit }) => {
  if (data.loading) {
    return null;
  }
  data = humps.camelizeKeys(data);
  const { latestArticles } = data;
  return (
    <div className={classes.LatestArticlesRibbon}>
      {latestArticles.map(article => {
        return (
          <RibbonComponent
            article={article}
            classes={classes}
            key={article.id}
          />
        );
      })}
    </div>
  );
};

export default graphql(LatestArticlesQuery, {
  options: ({ limit }) => ({ variables: { limit: limit || 5 } }),
  // if limit not given as prop, we use 5 as the default.
})(injectSheet(styles)(LatestArticlesRibbon));
