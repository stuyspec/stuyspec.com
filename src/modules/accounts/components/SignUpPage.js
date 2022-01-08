import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Link } from 'react-router-dom';
import Grid from 'react-bootstrap/lib/Grid';
import Row from 'react-bootstrap/lib/Row';
import Col from 'react-bootstrap/lib/Col';
import injectSheet from 'react-jss';
import { Helmet } from 'react-helmet';

import { SignUpForm } from './forms';
import { signUp } from '../actions';

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

function SignUpPage({ classes, signUp }) {
  return (
    <Grid fluid>
      <Helmet titleTemplate="%s | The Stuyvesant Spectator">
        <title>Sign Up</title>
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
          <p className={classes.pageTitle}>Create an Account</p>
          <Link to="/myaccount" className={classes.signUpRedirect}>
            Already have an account? Log in »
          </Link>
          <hr className={classes.hr} />
          <SignUpForm onSubmit={signUp} />
        </Col>
      </Row>
    </Grid>
  );
}

const mapDispatchToProps = dispatch => bindActionCreators({ signUp }, dispatch);

export default connect(null, mapDispatchToProps)(
  injectSheet(styles)(SignUpPage),
);
