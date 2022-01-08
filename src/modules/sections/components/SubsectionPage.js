import React from 'react';
import injectSheet from 'react-jss';
import { Grid, Row, Col } from 'react-bootstrap';
import { Helmet } from 'react-helmet';

import { ArticleFeed } from '../../articles/components';
import { TallAd } from '../../advertisements/components/index';

const styles = {
  latestArticles: {
    borderRight: 'solid 1px #ddd',
    marginTop: '8px',
    padding: '0 13px 0 0',
    '& > div:last-child': {
      // articleBlocks
      border: 'none',
      margin: 0,
    },
  },
  TallAdContainer: {
    marginTop: '66px',
    paddingLeft: '14px !important',
    paddingRight: '0 !important',
  },
  '@media (max-width: 767px)': {
    latestArticles: {
      borderRight: 'none',
      paddingRight: 0,
    },
  },
};

function SubsectionPage({ classes, section }) {
  return (
    <Grid fluid className={classes.SubsectionPage}>
      <Helmet>
        <title>
          {section.name}
          {' '}
          | The Stuyvesant Spectator
        </title>
        <meta />
      </Helmet>
      <Row>
        <Col xs={12} sm={9} md={9} lg={9} className={classes.latestArticles}>
          <ArticleFeed section={section} title={section.name} />
        </Col>
        <Col xsHidden sm={3} md={3} lg={3} className={classes.TallAdContainer}>
          <TallAd />
        </Col>
      </Row>
    </Grid>
  );
}

export default injectSheet(styles)(SubsectionPage);
