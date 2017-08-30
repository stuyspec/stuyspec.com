import React from "react";
import { connect } from "react-redux";
import injectSheet from "react-jss";

import ArticleList from "./ArticleList";

import { getLatestArticles } from "../selectors";

const styles = {
  LatestPage: {
    margin: "0 auto",
    width: "1060px",
  },
};

const LatestPage = ({ classes, latestArticles }) => {
  return (
    <div className={classes.LatestPage}>
      <h1>Latest Articles</h1>
      <ArticleList articles={latestArticles} />
    </div>
  );
};

const mapStateToProps = state => ({
  latestArticles: getLatestArticles(state),
});

export default connect(mapStateToProps)(injectSheet(styles)(LatestPage));
