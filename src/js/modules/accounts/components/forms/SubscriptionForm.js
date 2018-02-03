import React from "react";
import { compose } from "redux";
import { Field, reduxForm } from "redux-form";
import injectSheet from "react-jss";
import { EMAIL_REGEX } from "../../../../constants";

import FormStatus from "./FormStatus";

const styles = {
  SignInForm: {
    fontFamily: "Minion Pro",
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
    backgroundColor: "#e2130b",
    border: "none",
    borderRadius: "3px",
    color: "#fff",
    fontFamily: "Circular Std",
    fontSize: "15px",
    fontWeight: "300",
    padding: "11px",
    margin: "9px 0 21px 0",
    width: "275px",
    "&:disabled": {
      background: "#ddd",
      borderColor: "#ddd",
      color: "#888",
    },
  },
  email: {
    backgroundColor: "#eee",
    border: "none",
    borderRadius: "3px",
    fontFamily: "Circular Std",
    fontSize: "15px",
    fontWeight: "300",
    padding: "11px",
    width: "275px",
  },
  error: {
    color: "red",
    margin: 0,
  },
};

const validate = formValues => {
  const errors = {};
  if (!formValues.email) {
    errors.email = "No email detected";
  } else if (!EMAIL_REGEX.test(formValues.email)) {
    errors.email = "Invalid email address";
  }
  return errors;
};

const renderField = ({
  input,
  label,
  type,
  classes,
  meta: { touched, error, warning },
}) => {
  return (
    <div>
      <div>
        <input
          {...input}
          placeholder={label}
          type={type}
          className={classes.email}
        />
        {touched &&
          ((error && (
            <p style={{ color: "red" }} className={classes.error}>
              {error}
            </p>
          )) ||
            (warning && <p>{warning}</p>))}
      </div>
    </div>
  );
};

const SubscriptionForm = ({
  classes,
  handleSubmit,
  submitting,
  callToAction,
}) => {
  return (
    <div className={classes.SubscriptionForm}>
      <form onSubmit={handleSubmit}>
        <Field
          name="email"
          type="email"
          component={renderField}
          label="Enter your e-mail address."
          classes={classes}
        />
        <div>
          <button
            type="submit"
            disabled={submitting}
            className={classes.submitButton}
          >
            {callToAction ? callToAction : "Subscribe"}
          </button>
        </div>
      </form>
      <FormStatus formName="subscription" />
    </div>
  );
};

export default compose(
  reduxForm({
    form: "subscription",
  }),
  injectSheet(styles),
)(SubscriptionForm);
