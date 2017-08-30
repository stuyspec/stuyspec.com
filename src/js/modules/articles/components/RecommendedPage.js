import React from "react";
import { connect } from "react-redux";
import injectSheet from "react-jss";

import ArticleList from "./ArticleList";

import { getRecommendedArticles } from "../selectors";

const styles = {
  RecommendedPage: {
    margin: "0 auto",
    width: "1060px",
  },
};

const RecommendedPage = ({ classes, recommendedArticles }) => {
  return (
    <div className={classes.RecommendedPage}>
      <h1>Recommended Articles</h1>
      <ArticleList articles={recommendedArticles} />
    </div>
  );
};

const mapStateToProps = state => ({
  recommendedArticles: getRecommendedArticles(state),
});

export default connect(mapStateToProps)(injectSheet(styles)(RecommendedPage));
