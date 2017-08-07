import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import injectSheet from 'react-jss';
import { Col, Grid, Row } from 'react-bootstrap/lib/';

import { articleBylineSelectorFactory } from '../selectors';

const styles = {
  ArticleList: {
    padding: 0,
    '& .row:not(:first-child)': {
      borderTop: '1px solid #ddd',
    }
  },
  articleRow: {
    listStyleType: 'none',
    margin: 0,
    padding: '14px 0',
    '& div:first-child': {
      paddingLeft: 0,
    },
    '& div:last-child': {
      paddingRight: 0,
    }
  },
  featuredImg: {
    width: '100%',
  },
  articleTitle: {
    display: 'block',
    fontFamily: 'MinionPro',
    fontSize: '26px',
    color: '#000',
    marginBottom: '5px',
    padding: 0,
  },
  articlePreview: {
    color: '#000',
    fontFamily: 'MinionPro',
    fontSize: '16px',
    lineHeight: '1.13',
    marginBottom: '8px'
  },
  byline: {
    fontFamily: 'Circular Std',
    fontSize: '12px',
    fontWeight: 'bold',
    color: '#000',
    textTransform: 'uppercase',
    marginRight: '6px',
    '& div': {
      display: 'inline',
      margin: 0,
      '& a': {
        color: '#000',
        '&:hover': {
          color: '#000'
        },
      },
    },
  },
  dateline: {
    fontFamily: 'Circular Std',
    fontSize: '12px',
    fontWeight: 'bold',
    color: '#666',
  }
};

const ArticleList = ({ classes, articles, featuredMedia, section, state }) => {
  const createArticleLinks = () => {
    return Object.keys(articles).map(articleSlug => {
      const article = articles[ articleSlug ];
      const articleBylineSelector = articleBylineSelectorFactory(article);
      const byline = articleBylineSelector(state);
      return (
        <Row key={`articleBlock${article.id}`} className={classes.articleRow}>
          <Col md={3} lg={3}>
            <figure>
              <img src={featuredMedia.url} className={classes.featuredImg}/>
            </figure>
          </Col>
          <Col md={6} lg={6}>
            <Link to={`${section.permalink}/${articleSlug}`}
                  className={classes.articleTitle}>
              {article.title}
            </Link>
            <p className={classes.articlePreview}>Dummy Preview Text: Your code breaks when I run gulp. Also, in SectionPage, you've imported SectionArticleList but you don't use it as a component. The error appears to be on line 41. Lastly, you've imported a ton of things in SectionArticleList that you don't need; delete those.</p>
            <p>
              <span className={classes.byline}>{byline}</span>
              <span className={classes.dateline}>July 29, 2017</span>
            </p>
          </Col>
        </Row>
      );
    })
  };
  return (
    <Grid className={classes.ArticleList}>
      {createArticleLinks()}
    </Grid>
  )
};

const mapStateToProps = (state) => ({
  state: state,
})
export default connect(mapStateToProps)( injectSheet(styles)(ArticleList) );