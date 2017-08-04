import React from 'react';
import { Link } from 'react-router-dom';
import injectSheet from 'react-jss';
import { Col, Grid, Row } from 'react-bootstrap/lib/';

const styles = {
  articleList: {
    width: '100%',
    margin: '0px',
  },
  eachArticle: {
    listStyleType: 'none',
    padding: '14px, 0px, 14.4px, 0px',
    marginLeft: '0px',
  },
  imagePerArticle: {
    width: '256px',
    height: '170.6px',
    align: 'left',
    marginLeft: '0px',
    paddingRight: '14px',
    padding: '0px',
  },
  articleTitle: {
    fontFamily: 'MinionPro',
    fontSize: '26px',
    textAlign: 'left',
    color: '#000000',
    margin: '0px 0px',
    border: '0px 0px',
    padding: '0px',
  },
  articleDescription: {
    height: '15px',
    fontFamily: 'MinionPro',
    fontSize: '16px',
    lineHeight: '1.13',
    textAlign: 'left',
    color: '#000000',
    padding: '5px 0px 0px 0px',
    margin: '0px 0px 13px 0px',
  },
  articleAuthor: {
    height: '0px',
    fontFamily: 'Circular Std',
    fontSize: '12px',
    fontWeight: 'bold',
    textAlign: 'left',
    color: '#000000',
    textTransform: 'uppercase',
    marginRight: '6px',
    float: 'left',
  },
  articleDivider: {
    paddingTop: '14.4',
    paddingBottom: '14',
  },
  dateline: {
    fontFamily: 'Circular Std',
    fontSize: '12px',
    fontWeight: 'bold',
    textAlign: 'left',
    color: '#666666',
    marginLeft: '0px',
  }
};

const SectionArticleList = ({classes, match, articles, featuredMedia, subsections,}) => {
  const createArticleLinks = (articles, featuredMedia, subsections, match) => {
    return Object.keys(articles).map((key) => {
      const article = articles[ key ];
      let pathToArticlePage = article.slug;
      if (subsections[ article.sectionSlug ] !== undefined) {
        pathToArticlePage = article.sectionSlug + '/' + article.slug;
      }
      return (
        <div>
          <Row key={article.id} className={classes.eachArticle}>
            <Col md={3} lg={3}>
              <figure>
                <img src={featuredMedia.url} className={classes.imagePerArticle}/>
              </figure>
            </Col>
            <Col md={6} lg={6}>
              <Link to={match.url + '/' + pathToArticlePage} className={classes.articleTitle}>{article.title}</Link>
              <p className={classes.articleDescription}>Cathy plays a horizontal guitara.</p>
              <p className={classes.dateline}><p className={classes.articleAuthor}>Jason Kao</p>9:41 AM</p>
            </Col>
          </Row>
          <hr className={classes.articleDivider}/>
        </div>
      );
    })
  };
  return (
    <Grid className={classes.articleList}>
      {createArticleLinks(articles, featuredMedia, subsections, match)}
    </Grid>
  )
};


export default injectSheet(styles)(SectionArticleList);