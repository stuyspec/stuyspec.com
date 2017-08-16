import React from "react";
import { connect } from "react-redux";
import injectSheet from "react-jss";

import {
  getArticleFromRequestedSlug,
  getFeaturedMediaForArticleWithUser
} from "../selectors";
import ArticleHeader from "./ArticleHeader";
import ArticleBody from "./ArticleBody";

const styles = {
  ArticlePage: {
    margin: '0 auto',
    width: '1060px',
  },
};

const ArticlePage = ({ classes, article, section, featuredMedia }) => {
  return (
    <div className={ classes.ArticlePage }>
      <ArticleHeader
        headline={ article.title }
        section={ section }
        contributors={ article.contributors }
        dateline={ article.dateline }
      />
      <ArticleBody content={ article.content } featuredMedia={ featuredMedia }/>
    </div>
  );
};

const mapStateToProps = (state, ownProps) => {
  return {
    article: getArticleFromRequestedSlug(state, ownProps),
    featuredMedia: getFeaturedMediaForArticleWithUser(state, ownProps),
  };
};

export default connect(
  mapStateToProps,
  null
)(injectSheet(styles)(ArticlePage));