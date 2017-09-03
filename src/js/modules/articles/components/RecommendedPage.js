import React from "react";
import { connect } from "react-redux";
import injectSheet from "react-jss";

import ArticleList from "./ArticleList";

import { getArticlesWithContributors } from "../selectors";

const styles = {
  RecommendedPage: {
    margin: "50px auto 0",
    width: "1066px",
  },
};

const RecommendedPage = ({ classes, articles }) => {
  return (
    <div className={classes.RecommendedPage}>
      <h1>Recommended Articles</h1>
      <ArticleList articles={articles} />
    </div>
  );
};

const mapStateToProps = state => ({
  articles: getArticlesWithContributors(state),
});

export default connect(mapStateToProps)(injectSheet(styles)(RecommendedPage));
