import React from "react";
import { connect } from "react-redux";
import { Field, reduxForm } from "redux-form";
import injectSheet from "react-jss";

const styles = {
  successMessage: {
    color: "green",
  },
  errorMessage: {
    color: "red",
  },
};

const validate = values => {
  const errors = {};
  if (!values.firstName) {
    errors.firstName = "Required";
  }
  if (!values.lastName) {
    errors.lastName = "Required";
  }
  if (!values.email) {
    errors.email = "Required";
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    errors.email = "Invalid email address";
  }
  if (!values.password) {
    errors.password = "Required";
  } else if (values.password.length < 8) {
    errors.password = "Password is too short (minimum is 8 characters).";
  }
  if (values.password !== values.passwordConfirmation) {
    errors.passwordConfirmation =
      "Password and password confirmation do not match.";
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

const SignUpForm = ({ classes, handleSubmit, submitting, status }) => {
  return (
    <div>
      <h1>Sign Up Form</h1>
      <form onSubmit={handleSubmit}>
        <Field
          name="firstName"
          type="text"
          component={renderField}
          label="First Name"
        />
        <Field
          name="lastName"
          type="text"
          component={renderField}
          label="Last Name"
        />
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
        <Field
          name="passwordConfirmation"
          type="password"
          component={renderField}
          label="Password Confirmation"
        />
        <div>
          <button type="submit" disabled={submitting}>
            Sign Up
          </button>
        </div>
      </form>
      {status.form === "signUp" && (
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

const SmartSignUpForm = connect(mapStateToProps, null)(
  injectSheet(styles)(SignUpForm),
);

export default reduxForm({
  form: "signUp",
  validate,
})(SmartSignUpForm);
