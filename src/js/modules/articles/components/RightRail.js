import React from 'react';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import humps from 'humps';
import injectSheet from 'react-jss';
import { Link } from 'react-router-dom';

import Byline from './Byline';
import { TallAd } from '../../advertisements/components';

const RightRailQuery = gql`
  query RightRailQuery {
    topRankedArticles(limit: 5) {
      id
      slug
      title
      contributors {
        first_name
        last_name
      }
      media {
        thumb_attachment_url
      }
      section {
        id
        permalink
      }
    }
  }
`;

const styles = {
  RightRail: {
    marginTop: '28px',
  },
  Recommended: {
    '& div:last-child': {
      borderBottom: 0,
    },
  },
  label: {
    borderTop: '1px solid #000',
    borderBottom: '1px solid #ddd',
    color: '#000',
    display: 'block',
    fontFamily: 'Circular Std',
    fontSize: '13px',
    fontWeight: 300,
    margin: '0 0 12px 0',
    padding: '4px 0',
    '&:hover, &:active, &:focus': {
      color: '#000',
    },
  },
  article: {
    borderBottom: 'solid 1px #ddd',
    paddingBottom: '9px',
    marginBottom: '7px',
  },
  bigTitle: {
    color: '#000',
    fontFamily: 'Minion Pro',
    fontSize: '18px',
    fontWeight: 'bold',
    lineHeight: '1.22',
    marginBottom: '7px',
  },
  smallTitle: {
    color: '#000',
    fontFamily: 'Minion Pro',
    fontSize: '15px',
    lineHeight: '1.25',
  },
  sectionLabel: {
    color: '#000',
    display: 'block',
    fontFamily: 'Minion Pro',
    fontSize: '12px',
    marginBottom: '6px',
    textTransform: 'uppercase',
    '&:hover, &:active, &:focus': {
      color: '#000',
      textDecoration: 'none',
    },
  },
  figure: {
    float: 'right',
    height: '62px',
    marginLeft: '5px',
    overflow: 'hidden',
    width: '62px',
    '& img': {
      width: '100%',
    },
  },
  Byline: {
    color: '#888',
    fontFamily: 'Circular Std',
    fontSize: '12px',
    fontWeight: 300,
    marginBottom: '3px',
    '& p': {
      margin: '0',
      display: 'inline',
      '& a': {
        color: '#888',
        '&:hover': {
          color: '#888',
        },
      },
    },
  },
  Dateline: {
    color: '#888',
    fontFamily: 'Circular Std',
    fontSize: '12px',
    fontWeight: 300,
    margin: 0,
    '& p': {
      color: '#000',
      margin: 0,
      display: 'inline',
    },
  },
  tallAdContainer: {
    marginTop: '100px',
  },
  '@media (max-width: 991px)': {
    RightRail: {
      paddingLeft: '1.5vw',
    },
  },
};

// inside a Col
const RightRail = ({ classes, data }) => {
  if (data.loading) {
    return null;
  }
  data = humps.camelizeKeys(data);
  const articles = data.topRankedArticles;
  return (
    <div className={classes.RightRail}>
      <div className={classes.Recommended}>
        <Link to='/recommended' className={classes.label}>
          Recommended
        </Link>
        {articles.map(article => {
          const { section } = article;
          return (
            <div className={classes.article} key={article.id}>
              {article.media.length > 0 && (
                <Link to={`${section.permalink}/${article.slug}`}>
                  <figure className={classes.figure}>
                    <img src={article.media[0].thumbAttachmentUrl} />
                  </figure>
                </Link>
              )}
              <Link
                to={`${section.permalink}/${article.slug}`}
                className={classes.smallTitle}
              >
                {article.title}
              </Link>
              <Byline classes={classes} contributors={article.contributors} />
            </div>
          );
        })}
      </div>
      <div className={classes.tallAdContainer}>
        <TallAd />
      </div>
    </div>
  );
};

export default graphql(RightRailQuery)(injectSheet(styles)(RightRail));
