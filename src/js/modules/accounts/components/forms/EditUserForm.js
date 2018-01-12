import React from "react";
import { compose } from "redux";
import { connect } from "react-redux";
import { Field, reduxForm } from "redux-form";
import injectSheet from "react-jss";
import { Table } from "react-bootstrap/lib";
import { EMAIL_REGEX } from "../../../../constants";

const styles = {
  successMessage: {
    color: "green",
    fontFamily: "Minion Pro",
    marginTop: "8px",
  },
  errorMessage: {
    color: "red",
    fontFamily: "Minion Pro",
    marginTop: "8px",
  },
  dataTable: {
    "& .table-responsive table > tbody > tr > td": {
      fontFamily: "Minion Pro",
      fontSize: "17px",
      padding: "8px 0",
    },
    "& .table-responsive table > tbody > tr > td:first-child": {
      paddingRight: "12px",
      width: "120px",
    },
  },
  saveButton: {
    backgroundColor: "#3472b7",
    border: "1px solid #3472b7",
    borderRadius: "3px",
    color: "#fff",
    fontFamily: "Minion Pro",
    fontSize: "15px",
    fontStyle: "italic",
    height: "32px",
    marginTop: "15px",
    textAlign: "center",
    width: "85px",
  },
};

// TODO: add warnings to specific forms

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
      <div>
        <input
          {...input}
          placeholder={label}
          type={type}
          style={{ width: "100%" }}
        />
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
        <div className={classes.dataTable}>
          <Table responsive>
            <tbody>
              <tr>
                <td>First Name</td>
                <td>
                  <Field
                    name="firstName"
                    type="text"
                    component={renderField}
                    label="First Name"
                  />
                </td>
              </tr>
              <tr>
                <td>Last Name</td>
                <td>
                  <Field
                    name="lastName"
                    type="text"
                    component={renderField}
                    label="Last Name"
                  />
                </td>
              </tr>
              <tr>
                <td>E-mail Address</td>
                <td>
                  <Field
                    name="email"
                    type="email"
                    component={renderField}
                    label="Email"
                  />
                </td>
              </tr>
            </tbody>
          </Table>
        </div>
        <div>
          <button
            type="submit"
            disabled={submitting}
            className={classes.saveButton}
          >
            Save
          </button>
        </div>
      </form>
      {status.formName === "editUser" && (
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

export default compose(
  reduxForm({
    form: "editUser",
    validate,
  }),
  connect(mapStateToProps),
  injectSheet(styles)
)(EditUserForm);
