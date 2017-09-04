import React from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { SignInForm, SignUpForm } from "./forms";

import { signIn, signUp } from "../actions";

const SignInPage = ({ signIn, signUp }) => {
  return (
    <div>
      <SignInForm onSubmit={signIn} />
      <hr />
      <SignUpForm onSubmit={signUp} />
    </div>
  );
};

const mapDispatchToProps = dispatch => {
  return bindActionCreators({ signIn, signUp }, dispatch);
};

export default connect(null, mapDispatchToProps)(SignInPage);
