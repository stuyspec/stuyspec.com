import React from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import SignUpForm from "./forms/SignUpForm";

import { createUser } from "../actions";

const SignUpPage = ({ createUser }) => {
  return (
    <SignUpForm onSubmit={ createUser }/>
  )
};

const mapDispatchToProps = dispatch => {
  return bindActionCreators(
    { createUser },
    dispatch
  );
}

export default connect(
  null,
  mapDispatchToProps,
)(SignUpPage);