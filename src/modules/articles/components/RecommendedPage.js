import React from 'react';
import { Grid, Row, Col } from 'react-bootstrap/lib';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import injectSheet from 'react-jss';
import { Helmet } from 'react-helmet';

import ArticleList from './ArticleList';
import { TallAd } from '../../advertisements/components/index';

const RecommendedPageQuery = gql`
  query RecommendedPageQuery($limit: Int!) {
    topRankedArticles(limit: $limit) {
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
        title
        attachment_url
        media_type
      }
      section {
        name
        permalink
      }
    }
  }
`;

const styles = {
  pageTitle: {
    color: '#000',
    fontFamily: 'Canela',
    fontSize: '48px',
    fontWeight: 500,
    lineHeight: 1,
    marginBottom: '11px',
  },
  articleList: {
    paddingRight: '14px !important',
  },
  tallAdContainer: {
    paddingLeft: '14px !important',
    marginTop: '57px',
    borderLeft: '1px solid #ddd',
  },
  '@media (max-width: 991px)': {
    articleList: {
      paddingRight: '0 !important',
    },
  },
};

function RecommendedPage({ classes, data }) {
  if (data.loading) {
    return null;
  }
  const { topRankedArticles } = data;
  return (
    <Grid fluid>
      <Helmet titleTemplate="%s | The Stuyvesant Spectator">
        <title>Recommended</title>
        <meta />
      </Helmet>
      <Row>
        <Col xs={12} sm={12} md={9} lg={9} className={classes.articleList}>
          <ArticleList
            articles={topRankedArticles}
            title="Recommended"
            label="Articles"
          />
        </Col>
        <Col
          xsHidden
          smHidden
          md={3}
          lg={3}
          className={classes.tallAdContainer}
        >
          <TallAd />
        </Col>
      </Row>
    </Grid>
  );
}

export default graphql(RecommendedPageQuery, {
  options: () => ({ variables: { limit: 20 } }),
})(injectSheet(styles)(RecommendedPage));
