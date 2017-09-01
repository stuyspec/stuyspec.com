import React from "react";
import { connect } from "react-redux";
import { Field, reduxForm } from "redux-form";
import injectSheet from "react-jss";
import { EMAIL_REGEX } from '../../../../constants';

const styles = {
  errorMessage: {
    color: "red",
  },
  successMessage: {
    color: "green",
  }
};

const validate = formValues => {
  const errors = {};
  if (!formValues.email) {
    errors.email = "Required";
  } else if (!EMAIL_REGEX.test(formValues.email)) {
    errors.email = "Invalid email address";
  }
  return errors;
};

const renderField = ({
  input,
  label,
  type,
  meta: { touched, error, warning },
}) => {
  return (
    <div>
      <label>{label}</label>
      <div>
        <input {...input} placeholder={label} type={type} />
        {touched &&
          ((error && <span>{error}</span>) ||
            (warning && <span>{warning}</span>))}
      </div>
    </div>
  );
};

const SignInForm = ({ classes, handleSubmit, submitting, status }) => {
  return (
    <div>
      <h1>Sign In Form</h1>
      <form onSubmit={handleSubmit}>
        <Field
          name="email"
          type="email"
          component={renderField}
          label="Email"
        />
        <Field
          name="password"
          type="password"
          component={renderField}
          label="Password"
        />
        <div>
          <button type="submit" disabled={submitting}>
            Sign In
          </button>
        </div>
      </form>
      {status.form === "signIn" && (
        <div>
          <p key="success" className={classes.successMessage}>
            {status.message}
          </p>
          {status.errors.map((error, index) => {
            return (
              <p key={index} className={classes.errorMessage}>
                {error}
              </p>
            );
          })}
        </div>
      )}
    </div>
  );
};

const mapStateToProps = state => ({
  status: state.accounts.status,
});

const ConnectedSignInForm = connect(mapStateToProps)(
  injectSheet(styles)(SignInForm),
);

export default reduxForm({
  form: "signIn",
  validate,
})(ConnectedSignInForm);
