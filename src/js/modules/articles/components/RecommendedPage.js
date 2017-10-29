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
  recommended: {
    borderBottom: "solid 1px #ddd",
    borderTop: "solid 1px #000",
    color: "#000",
    fontFamily: "Circular Std",
    fontSize: "13px",
    fontWeight: 300,
    marginBottom: "22px",
    padding: "4px 0",
  },
};

const RecommendedPage = ({ classes, articles }) => {
  return (
    <div className={classes.RecommendedPage}>
      <p className={classes.recommended}>Recommended Articles</p>
      <ArticleList articles={articles} />
    </div>
  );
};

const mapStateToProps = state => ({
  articles: getArticlesWithContributors(state),
});

export default connect(mapStateToProps)(injectSheet(styles)(RecommendedPage));
