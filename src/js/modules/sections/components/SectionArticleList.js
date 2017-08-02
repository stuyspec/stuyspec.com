import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import injectSheet from 'react-jss';
import SectionPage from './SectionPage';

import articles from '../../articles';

const styles = {
  articleList: {
    width: '100%',
    margin: '0px',
  }
};

const SectionArticleList = ({classes, articles, subsections, section, match, featuredMedia}) => {
  const createArticleLinks = () => {
    return Object.keys(articles).map((key) => {
      const article = articles[ key ];
      let pathToArticlePage = article.slug;
      if (subsections[ article.sectionSlug ] !== undefined) {
        pathToArticlePage = article.sectionSlug + '/' + article.slug;
      }
      return (
        <div>
        <ArticleList
        <Row key={article.id} className={classes.eachArticle}>
          <Col md={3} lg={3}>
            <figure>
              <img src={featuredMedia.url} className={classes.imagePerArticle}/>
            </figure>
          </Col>
          <Col md={6} lg={6}>
            <Link to={match.url + '/' + pathToArticlePage} className={classes.articleTitle}>{article.title}</Link>
            <p className={classes.articleDescription}>Cathy plays a horizontal guitara.</p>
            <p className={classes.articleAuthor}>Jason Kao</p>
          </Col>
        </Row>
        <hr className={classes.articleDivider}/>
        />
        </div>
      );
    });
  };

  const ArticleList = ({ articles, featuredMedia }) => {
    return (
     <Grid className={classes.articleList}>
     {createArticleLinks()}
     </Grid>
   );
};
};

export default injectSheet(styles)(SectionArticleList);