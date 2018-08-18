import React, { PureComponent } from 'react';
import { compose } from 'redux';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import humps from 'humps';
import injectSheet from 'react-jss';
import Grid from 'react-bootstrap/lib/Grid';
import { Helmet } from 'react-helmet';
import { ArticleHeader, ArticleBody, ArticleFooter, RecommendedRow } from './';
import CommentThread from '../../comments/components/CommentThread';

const ArticleQuery = gql`
  query ArticleQuery($slug: String!) {
    articleBySlug(slug: $slug) {
      id
      slug
      title
      preview
      content
      media {
        id
        attachment_url
        medium_attachment_url
        thumb_attachment_url
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
      published_comments {
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

class ArticlePage extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      article: null,
    };
  }

  componentWillReceiveProps(nextProps) {
    let { data } = nextProps;

    if (data.loading) {
      return;
    }
    data = humps.camelizeKeys(data);

    if (data.articleBySlug) {
      this.setState({ article: data.articleBySlug });
    }
  }

  render() {
    const { article } = this.state;
    const { classes } = this.props;

    if (!article) {
      return null;
    }

    const { section } = article;

    return (
      <Grid fluid className={classes.ArticlePage}>
        <Helmet titleTemplate='%s | The Stuyvesant Spectator'>
          <title>{article.title}</title>
        </Helmet>
        <ArticleHeader article={article} />
        <ArticleBody article={article} />
        <ArticleFooter article={article} />
        <RecommendedRow section={section.parentSection || section} />
        <CommentThread article={article} />
      </Grid>
    );
  }
}

export default compose(
  graphql(ArticleQuery, {
    options: ({ match }) => ({
      variables: { slug: match.params.article_slug },
    }),
  }),
  injectSheet(styles),
)(ArticlePage);
