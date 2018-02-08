import React, { Component } from 'react';
import { compose } from 'redux';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import humps from 'humps';
import injectSheet from 'react-jss';
import Grid from 'react-bootstrap/lib/Grid';
import Row from 'react-bootstrap/lib/Row';
import Col from 'react-bootstrap/lib/Col';
import { Helmet } from 'react-helmet';
import { SPEC_REFERENCE_PATTERN } from '../../../constants';
import { ArticleHeader, ArticleBody, ArticleFooter, RecommendedRow } from './';
import CommentThread from '../../comments/components/CommentThread';
import NotFoundPage from '../../core/components/NotFoundPage';

const ArticleQuery = gql`
  query ArticleQuery($slug: String!) {
    articleBySlug(slug: $slug) {
      id
      slug
      title
      content
      media {
        id
        attachment_url
        media_type
        caption
        title
        user {
          first_name
          last_name
          slug
        }
      }
      created_at
      volume
      issue
      contributors {
        first_name
        last_name
        slug
      }
      section {
        id
        name
        permalink
        parent_section {
          id
          name
          permalink
        }
      }
      comments {
        id
        content
        created_at
        user {
          first_name
          last_name
        }
      }
      outquotes {
        text
      }
    }
  }
`;

const styles = {
  subscribe: {
    color: '#3572b7',
    '&:hover, &:focus, &:active': {
      color: '#3572b7',
    },
    '&:hover': {
      cursor: 'pointer',
    },
  },
  '@media (max-width: 1199px)': {
    ArticlePage: {
      padding: '0 8%',
    },
  },
  '@media (max-width: 991px)': {
    ArticlePage: {
      padding: 0,
    },
  },
};

const ArticlePage = ({ classes, data }) => {
  if (data.loading) {
    return null;
  }
  data = humps.camelizeKeys(data);

  const { articleBySlug } = data;
  const { section } = articleBySlug;

  return (
    <Grid fluid className={classes.ArticlePage}>
      <Helmet titleTemplate="%s | The Stuyvesant Spectator">
        <title>{articleBySlug.title}</title>
        <meta />
      </Helmet>
      <ArticleHeader article={articleBySlug} />
      <ArticleBody article={articleBySlug} />
      <ArticleFooter article={articleBySlug} />
      <RecommendedRow section={section.parentSection || section} />
      <CommentThread article={articleBySlug} />
    </Grid>
  );
};

export default compose(
  graphql(ArticleQuery, {
    options: ({ match }) => ({
      variables: { slug: match.params.article_slug },
    }),
  }),
  injectSheet(styles),
)(ArticlePage);
