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

const EditPasswordForm = ({ classes, handleSubmit, submitting, status }) => {
  return (
    <div>
      <form onSubmit={handleSubmit}>
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
            Save
          </button>
        </div>
      </form>
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
  );
};

const mapStateToProps = state => ({
  status: state.accounts.updatePasswordStatus,
});

const SmartEditPasswordForm = connect(mapStateToProps, null)(
  injectSheet(styles)(EditPasswordForm),
);

export default reduxForm({
  form: "editUser",
  validate,
})(SmartEditPasswordForm);
