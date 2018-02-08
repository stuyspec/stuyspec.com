import React from 'react';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import humps from 'humps';
import { Grid, Row, Col } from 'react-bootstrap/lib';
import injectSheet from 'react-jss';
import { Helmet } from 'react-helmet';

import ArticleList from './ArticleList';
import { TallAd } from '../../advertisements/components';

const LatestPageQuery = gql`
  query LatestPageQuery($limit: Int!) {
    latestArticles(limit: $limit) {
      id
      title
      slug
      summary
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
    padding: 0,
  },
  '@media (min-width: 992px)': {
    articleList: {
      paddingRight: '14px !important',
    },
    tallAdContainer: {
      borderLeft: '1px solid #ddd',
      marginTop: '57px',
      paddingLeft: '14px !important',
    },
  },
};

const LatestPage = ({ classes, data }) => {
  if (data.loading) {
    return null;
  }
  data = humps.camelizeKeys(data);
  const { latestArticles } = data;
  return (
    <Grid fluid>
      <Helmet titleTemplate="%s | The Stuyvesant Spectator">
        <title>The Latest</title>
        <meta />
      </Helmet>
      <Row>
        <Col xs={12} sm={12} md={9} lg={9} className={classes.articleList}>
          <ArticleList
            articles={latestArticles}
            title="Latest"
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
};

export default graphql(LatestPageQuery, {
  options: props => ({ variables: { limit: 20 } }),
})(injectSheet(styles)(LatestPage));
