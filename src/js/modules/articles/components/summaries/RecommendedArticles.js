import React from 'react';
import { Link } from 'react-router-dom';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import humps from 'humps';
import injectSheet from 'react-jss';
import { Row, Col } from 'react-bootstrap/lib';

const RecommendedArticlesQuery = gql`
  query RecommendedArticlesQuery($limit: Int!) {
    topRankedArticles(limit: $limit) {
      id
      title
      slug
      summary
      section {
        id
        permalink
      }
    }
  }
`;

const styles = {
  RecommendedArticles: {
    padding: '0 0 10px 7px',
  },
  label: {
    borderTop: '1px solid #000',
    borderBottom: '1px solid #ddd',
    color: '#000',
    display: 'block',
    fontFamily: 'Circular Std',
    fontSize: '13px',
    fontWeight: 300,
    margin: 0,
    padding: '4px 0',
    '&:hover, &:active, &:focus': {
      color: '#000',
    },
  },
  numberLabel: {
    color: '#000',
    float: 'left',
    fontFamily: 'Circular Std',
    fontSize: '13px',
    fontWeight: 300,
    margin: 0,
  },
  articleItem: {
    padding: '12px 0 12px 12px',
    '&:not(:last-child)': {
      borderBottom: 'solid 1px #ddd',
    },
  },
  articleSummary: {
    paddingLeft: '21px',
  },
  title: {
    color: '#000',
    display: 'block',
    fontFamily: 'Minion Pro',
    fontSize: '14px',
    fontWeight: 'bold',
    lineHeight: 1,
    marginBottom: '8px',
    '&:hover, &:active, &:focus': {
      color: '#000',
    },
  },
  summary: {
    color: '#000',
    fontFamily: 'Minion Pro',
    fontSize: '14px',
    lineHeight: 1.21,
    margin: 0,
  },
};

const RecommendedArticles = ({ classes, data }) => {
  if (data.loading) {
    return null;
  }
  data = humps.camelizeKeys(data);
  const { topRankedArticles } = data;
  return (
    <div className={classes.RecommendedArticles}>
      <Link to="/recommended" className={classes.label}>
        Recommended
      </Link>
      {topRankedArticles.map((article, index) => {
        return (
          <div className={classes.articleItem} key={article.id}>
            <p className={classes.numberLabel}>{index + 1}.</p>
            <div className={classes.articleSummary}>
              <Link
                className={classes.title}
                to={`${article.section.permalink}/${article.slug}`}
              >
                {article.title}
              </Link>
              <p className={classes.summary}>{article.summary}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default graphql(RecommendedArticlesQuery, {
  options: ({ limit }) => ({ variables: { limit: limit || 5 } }),
  // if limit not given as prop, we use 5 as the default.
})(injectSheet(styles)(RecommendedArticles));
