import React from 'react';
import injectSheet from 'react-jss';
import { Grid, Row, Col } from 'react-bootstrap/lib';

import Masthead from './Masthead';
import MastheadBar from './MastheadBar';

const styles = {
  HeaderContainer: {
    width: '100% !important',
    padding: '0 !important',
  },
  mastheadBar: {
    marginTop: '130px',
  },
};

function PageHeader({ classes, location }) {
  return (
    <Grid className={classes.HeaderContainer}>
      <Row>
        <Col xsHidden smHidden md={12} lg={12}>
          {location.pathname === '/' ? (
            <Masthead />
          ) : (
            <div className={classes.mastheadBar}>
              <MastheadBar />
            </div>
          )}
        </Col>
      </Row>
      <Row>
        <Col xs={12} sm={12} mdHidden lgHidden>
          <div
            className={classes.mastheadBar}
            style={{ marginTop: location.pathname === '/' ? '90px' : '130px' }}
          >
            <MastheadBar location={location} />
          </div>
        </Col>
      </Row>
    </Grid>
  );
}

export default injectSheet(styles)(PageHeader);
