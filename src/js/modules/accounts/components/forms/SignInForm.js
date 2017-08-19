import React from "react";
import { connect } from "react-redux";
import { Field, reduxForm } from "redux-form";
import injectSheet from "react-jss";

const styles = {
  errorMessage: {
    color: 'red',
  },
};

const validate = values => {
  const errors = {}
  if (!values.email) {
    errors.email = 'Required'
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    errors.email = 'Invalid email address';
  }
  return errors
};

const renderField = ({
                       input,
                       label,
                       type,
                       meta: { touched, error, warning }
                     }) => {
  return (
    <div>
      <label>
        { label }
      </label>
      <div>
        <input { ...input } placeholder={ label } type={ type }/>
        { touched &&
        ((error &&
          <span>
            { error }
          </span>) ||
          (warning &&
            <span>
              { warning }
            </span>)) }
      </div>
    </div>
  );
};

const SignInForm = ({ classes, handleSubmit, submitting, errors }) => {
  return (
    <div>
      <h1>Sign In Form</h1>
      <form onSubmit={ handleSubmit }>
        <Field name="email" type="email" component={ renderField } label="Email"/>
        <Field name="password" type="text" component={ renderField } label="Password"/>
        <div>
          <button type="submit" disabled={ submitting }>
            Sign In
          </button>
        </div>
      </form>
      {
        errors.map((error, index) => {
          return (
            <p key={ index } className={ classes.errorMessage }>
              { error }
            </p>
          );
        })
      }
    </div>
  )
}

const mapStateToProps = state => ({
  errors: state.accounts.signInErrors,
});

const SmartSignInForm = connect(
  mapStateToProps,
  null,
)(injectSheet(styles)(SignInForm));

export default reduxForm({
  form: 'signIn',
  validate,
})(SmartSignInForm);