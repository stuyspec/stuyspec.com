import React from 'react';
import { connect } from 'react-redux';
import injectSheet from 'react-jss';

import { getArticleFromRequestedSlug, getContributorsOfArticle } from '../selectors';
import ArticleHeader from './ArticleHeader';
import ArticleBody from './ArticleBody';

const styles = {
  ArticlePage: {
    margin: '0 auto',
    width: '1060px',
  },
};

/**
 * @param match necessary for retrieving article from slug.
 */
const ArticlePage = ({ classes, article, section, featuredMedia, contributors, match }) => {
  return (
    <div className={classes.ArticlePage}>
      <ArticleHeader
        headline={article.title}
        section={section}
        contributors={contributors}
        dateline={article.dateline}
      />
      <ArticleBody content={article.content} featuredMedia={featuredMedia}/>
    </div>
  );
};

const mapStateToProps = (state, ownProps) => ({
  article: getArticleFromRequestedSlug(state, ownProps),
  contributors: getContributorsOfArticle(state, ownProps),
  featuredMedia: {
    url: 'http://planesandpleasures.com/wp-content/uploads/2016/09/NewYork-Chinatown-7.jpg',
    caption: 'New York City street after rain is covered in water, dirt, and snow. Pedestrians walk back and forth as post-flood confusion amasses.',
    type: 'Photograph',
    credits: 'Ting Ting',
  },
});

export default connect(
  mapStateToProps,
  null
)( injectSheet(styles)(ArticlePage) );
