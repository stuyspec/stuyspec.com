/* SectionBlocks are cards that display the top three articles of a section.
 * They are used in the middle 2 columns of the second level of the HomePage and
 * at the right of the ArticleList on a SectionPage of a section with child
 * sections.
 */

import React from 'react';
import { Link } from 'react-router-dom';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import injectSheet from 'react-jss';

import Dateline from '../../articles/components/Dateline';
import Byline from '../../articles/components/Byline';

const SectionBlockQuery = gql`
  query SectionBlockQuery($section_slug: String!) {
    topRankedArticles(limit: 3, section_slug: $section_slug) {
      id
      title
      slug
      preview
      created_at
      contributors {
        first_name
        last_name
        slug
      }
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
  SectionBlock: {
    '& > div:last-child': {
      // targets last article
      border: 'none',
      paddingBottom: 0,
    },
  },
  article: {
    borderBottom: 'solid 1px #ddd',
    paddingBottom: '12px',
    marginBottom: '10px',
  },
  bigTitle: {
    color: '#000',
    display: 'block',
    fontFamily: 'Minion Pro',
    fontSize: '18px',
    fontWeight: 'bold',
    lineHeight: '1.22',
    marginBottom: '7px',
    '&:hover, &:active, &:focus': {
      color: '#000',
    },
  },
  smallTitle: {
    color: '#000',
    fontFamily: 'Minion Pro',
    fontSize: '16px',
    lineHeight: '1.25',
    '&:hover, &:active, &:focus': {
      color: '#000',
    },
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
    marginLeft: '6px',
    maxHeight: '45px',
    overflow: 'hidden',
    width: '62px',
    '& img': {
      width: '100%',
    },
  },
  preview: {
    color: '#000',
    fontFamily: 'Minion Pro',
    fontSize: '14px',
    lineHeight: '1.29',
    marginBottom: '13px',
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
        '&:hover, &:active, &:focus': {
          color: '#888',
        },
      },
    },
  },
};

function SectionBlock({ classes, data }) {
  if (data.loading || data.topRankedArticles.length === 0) {
    return null;
  }

  const { topRankedArticles } = data;
  const bigArticle = topRankedArticles[0];
  const { section } = bigArticle;

  return (
    <div className={classes.SectionBlock}>
      <Link to={section.permalink} className={classes.sectionLabel}>
        {section.name}
      </Link>
      {bigArticle && (
        <div className={classes.article}>
          <Link
            to={`${section.permalink}/${bigArticle.slug}`}
            className={classes.bigTitle}
          >
            {bigArticle.title}
          </Link>
          <p className={classes.preview}>{bigArticle.preview}</p>
          <Byline classes={classes} contributors={bigArticle.contributors} />
          <Dateline timestamp={bigArticle.created_at} />
        </div>
      )}
      {topRankedArticles.slice(1).map(article => (
        <div className={classes.article} key={article.id}>
          {article.media.length > 0 && (
          <Link to={`${section.permalink}/${article.slug}`}>
            <figure className={classes.figure}>
              <img
                src={article.media[0].thumb_attachment_url}
                alt={article.media[0].title}
              />
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
      ))}
    </div>
  );
}

export default graphql(SectionBlockQuery, {
  options: ({ slug }) => ({ variables: { section_slug: slug } }),
})(injectSheet(styles)(SectionBlock));
