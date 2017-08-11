import React from "react";
import { connect } from "react-redux";
import injectSheet from "react-jss";

import { getArticleFromRequestedSlug } from "../selectors";
import ArticleHeader from "./ArticleHeader";
import ArticleBody from "./ArticleBody";

const styles = {
  ArticlePage: {
    margin: '0 auto',
    width: '1060px',
  },
};

const ArticlePage = ({ classes, article, section }) => {
  return (
    <div className={classes.ArticlePage}>
      <ArticleHeader
        headline={article.title}
        section={section}
        contributors={article.contributors}
        dateline={article.dateline}
      />
      <ArticleBody content={article.content} featuredMedia={article.featuredMedia}/>
    </div>
  );
};

/*
  TODO: Add this back in once done with testing
    featuredMedia: {
      url: 'http://planesandpleasures.com/wp-content/uploads/2016/09/NewYork-Chinatown-7.jpg',
      caption: 'New York City street after rain is covered in water, dirt, and snow. Pedestrians walk back and forth as post-flood confusion amasses.',
      type: 'Photograph',
      credits: 'Ting Ting',
    },
 */

const mapStateToProps = (state, ownProps) => {
  return {
    article: getArticleFromRequestedSlug(state, ownProps),
  };
};

export default connect(
  mapStateToProps,
  null
)(injectSheet(styles)(ArticlePage));