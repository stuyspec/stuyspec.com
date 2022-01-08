import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Link } from 'react-router-dom';
import { Grid, Row, Col } from 'react-bootstrap/lib';
import injectSheet from 'react-jss';
import { Helmet } from 'react-helmet';

import { SignInForm } from './forms';
import { signIn } from '../actions';

const styles = {
  pageTitle: {
    color: '#000',
    fontFamily: 'Canela',
    fontSize: '48px',
    fontWeight: 500,
    lineHeight: 1,
    marginBottom: '11px',
  },
  hr: {
    margin: '10px 0',
  },
  signUpRedirect: {
    color: '#3084df',
    display: 'block',
    fontFamily: 'Minion Pro',
    fontSize: '17px',
    marginBottom: '7px',
  },
};

function SignInPage({ classes, signIn }) {
  return (
    <Grid fluid>
      <Helmet titleTemplate="%s | The Stuyvesant Spectator">
        <title>Sign In</title>
        <meta />
      </Helmet>
      <Row>
        <Col
          xs={12}
          sm={6}
          smOffset={3}
          md={6}
          mdOffset={3}
          lg={6}
          lgOffset={3}
        >
          <p className={classes.pageTitle}>Log In</p>
          <Link to="/myaccount/sign-up" className={classes.signUpRedirect}>
            Don't have an account? Create one »
          </Link>
          <hr className={classes.hr} />
          <SignInForm onSubmit={signIn} />
        </Col>
      </Row>
    </Grid>
  );
}

const mapDispatchToProps = dispatch => bindActionCreators({ signIn }, dispatch);

export default connect(null, mapDispatchToProps)(
  injectSheet(styles)(SignInPage),
);
