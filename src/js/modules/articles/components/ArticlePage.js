import React from "react";
import { connect } from "react-redux";
import injectSheet from "react-jss";

import ArticleHeader from "./ArticleHeader";
import ArticleBody from "./ArticleBody";
import CommentThread from "../../comments/components/CommentThread";
import {
  getArticleFromRequestedSlug,
  getArticleFeaturedMedia,
} from "../selectors";

const styles = {
  ArticlePage: {
    margin: "0 auto",
    width: "1060px",
  },
};

const ArticlePage = ({ classes, article, section, featuredMedia }) => {
  return (
    <div className={ classes.ArticlePage }>
      <ArticleHeader article={ article } section={ section }/>
      <ArticleBody content={ article.content } featuredMedia={ featuredMedia }/>
      <CommentThread article={article}/>
    </div>
  );
};

const mapStateToProps = (state, ownProps) => ({
  article: getArticleFromRequestedSlug(state, ownProps),
  featuredMedia: getArticleFeaturedMedia(state, ownProps),
});

export default connect(mapStateToProps)(injectSheet(styles)(ArticlePage));
