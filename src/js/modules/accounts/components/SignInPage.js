import React from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Grid, Row, Col } from "react-bootstrap/lib";
import injectSheet from "react-jss";

import { SignInForm, SignUpForm } from "./forms";
import { signIn, signUp } from "../actions";

const styles = {
  "@media (min-width: 992px)": {
    SignInPage: {
      marginTop: "60px",
    },
  },
};

const SignInPage = ({ classes, signIn, signUp }) => {
  return (
    <Grid fluid className={classes.SignInPage}>
      <Row>
        <Col xs={12} sm={6} smOffset={3} md={6} mdOffset={3} lg={6} lgOffset={3}>
          <SignInForm onSubmit={signIn} />
        </Col>
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
