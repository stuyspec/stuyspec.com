import React from 'react';
import { Grid, Row, Col } from 'react-bootstrap/lib';
import injectSheet from 'react-jss';
import { Helmet } from 'react-helmet';

import ArticleFeed from './ArticleFeed';
import { TallAd } from '../../advertisements/components';

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

function LatestPage({ classes }) {
  return (
    <Grid fluid>
      <Helmet titleTemplate="%s | The Stuyvesant Spectator">
        <title>The Latest</title>
        <meta />
      </Helmet>
      <Row>
        <Col xs={12} sm={12} md={9} lg={9} className={classes.articleList}>
          <ArticleFeed />
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

export default injectSheet(styles)(LatestPage);
