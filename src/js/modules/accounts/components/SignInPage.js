import React from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Grid, Row, Col } from "react-bootstrap/lib";
import injectSheet from "react-jss";

import { SignInForm, SignUpForm } from "./forms";
import { signIn, signUp } from "../actions";

const styles = {
  SignInPage: {
    margin: "78px auto 0",
    width: "1066px",
  },
};

const SignInPage = ({ classes, signIn, signUp }) => {
  return (
    <Grid className={classes.SignInPage}>
      <Row>
        <Col md={6} lg={6}>
          <SignInForm onSubmit={signIn} />
          <hr />
          <SignUpForm onSubmit={signUp} />
        </Col>
        <Col md={6} lg={6} />
      </Row>
    </Grid>
  );
};

const mapDispatchToProps = dispatch => {
  return bindActionCreators({ signIn, signUp }, dispatch);
};

export default connect(null, mapDispatchToProps)(
  injectSheet(styles)(SignInPage),
);
