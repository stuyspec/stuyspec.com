import React from 'react';
import injectSheet from 'react-jss';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';

import RibbonComponent from './RibbonComponent';

const LatestArticlesQuery = gql`
  query LatestArticlesQuery($limit: Int!) {
    latestArticles(limit: $limit) {
      id
      title
      slug
      preview
      media {
        thumb_attachment_url
      }
      section {
        id
        name
        permalink
      }
    }
  }
`;

const styles = {
  LatestArticlesRibbon: {
    borderTop: '1px solid #ddd',
    borderBottom: '1px solid #ddd',
    fontSize: 0,
    marginBottom: '22px',
  },
  RibbonComponent: {
    display: 'inline-block',
    height: '66px',
    marginTop: '9px',
    marginBottom: '11px',
    overflow: 'hidden',
    paddingRight: '12.5px',
    width: '20%',
    '&:not(:last-child)': {
      borderRight: 'solid 1px #ddd',
    },
    '&:not(:first-child)': {
      paddingLeft: '12.5px',
    },
  },
  sectionLabel: {
    display: 'block',
    color: '#a8a8a8',
    fontFamily: 'Circular Std',
    fontSize: '1rem',
    fontWeight: 300,
    letterSpacing: '0.5px',
    marginBottom: '3px',
    textTransform: 'uppercase',
    '&:hover': {
      color: '#a8a8a8',
      textDecoration: 'none',
    },
    '&:focus': {
      color: '#a8a8a8',
      textDecoration: 'none',
    },
  },
  title: {
    color: '#000',
    display: 'block',
    fontFamily: 'Minion Pro',
    fontSize: '1.45rem',
    fontWeight: 'bold',
    letterSpacing: '0.5px',
    lineHeight: 1.17,
    margin: 0,
    '&:hover, &:active, &:focus': {
      color: '#000',
    },
  },
  figure: {
    float: 'left',
    margin: '3px 8px 0 0',
    width: '75px',
    '& img': {
      width: '100%',
    },
  },
  '@media (max-width: 991px)': {
    figure: {
      width: '42%',
    },
  },
};

function LatestArticlesRibbon({ classes, data }) {
  if (data.loading) {
    return null;
  }
  const { latestArticles } = data;
  return (
    <div className={classes.LatestArticlesRibbon}>
      {latestArticles.map(article => (
        <RibbonComponent
          article={article}
          classes={classes}
          key={article.id}
        />
      ))}
    </div>
  );
}

export default graphql(LatestArticlesQuery, {
  options: ({ limit }) => ({
    variables: {
      // if limit not given as prop, we use 5 as the default.
      limit: limit || 5,
    },
  }),
})(injectSheet(styles)(LatestArticlesRibbon));
