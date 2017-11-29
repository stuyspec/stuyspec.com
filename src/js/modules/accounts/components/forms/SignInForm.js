import React from "react";
import { connect } from "react-redux";
import { Field, reduxForm } from "redux-form";
import injectSheet from "react-jss";
import { EMAIL_REGEX } from "../../../../constants";

const styles = {
  SignInForm: {
    fontFamily: "Minion Pro",
    width: "100%",
    "& form div": {
      // each Field
      marginBottom: "7px",
    },
  },
  errorMessage: {
    color: "red",
  },
  successMessage: {
    color: "green",
  },
  submitButton: {
    backgroundColor: "#3472b7",
    border: "1px solid #3472b7",
    borderRadius: "3px",
    color: "#fff",
    fontSize: "15px",
    fontStyle: "italic",
    height: "32px",
    marginTop: "15px",
    textAlign: "center",
    width: "70px",
    "&:disabled": {
      background: "#ddd",
      borderColor: "#ddd",
      color: "#888",
    },
  },
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
        <input
          style={{ width: "100%" }}
          {...input}
          placeholder={label}
          type={type}
        />
        {touched &&
          ((error && <span style={{ color: "red" }}>{error}</span>) ||
            (warning && <span>{warning}</span>))}
      </div>
    </div>
  );
};

const SignInForm = ({ classes, handleSubmit, submitting, status }) => {
  return (
    <div className={classes.SignInForm}>
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
          <button
            type="submit"
            disabled={submitting}
            className={classes.submitButton}
          >
            Sign In
          </button>
        </div>
      </form>
      {status.formName === "signIn" && (
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
