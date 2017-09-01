import React from "react";
import { connect } from "react-redux";
import { Field, reduxForm } from "redux-form";
import injectSheet from "react-jss";
import { EMAIL_REGEX } from '../../../../constants';

const styles = {
  successMessage: {
    color: "green",
  },
  errorMessage: {
    color: "red",
  },
};

const validate = formValues => {
  const errors = {};
  if (formValues.email && !EMAIL_REGEX.test(formValues.email)) {
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

const EditUserForm = ({ classes, handleSubmit, submitting, status }) => {
  return (
    <div>
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
          label="Email (if this field is changed, a confirmation will be sent to the new email)"
        />
        <div>
          <button type="submit" disabled={submitting}>
            Save
          </button>
        </div>
      </form>
      {status.form === "editUser" && (
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

const ConnectedEditUserForm = connect(mapStateToProps, null)(
  injectSheet(styles)(EditUserForm),
);

export default reduxForm({
  form: "editUser",
  validate,
})(ConnectedEditUserForm);
