import React  from "react";
import { connect } from "react-redux";
import { reduxForm } from "redux-form";
import injectSheet from "react-jss";

// TODO isolate forms completely (move submit handling into forms)

const styles = {
  successMessage: {
    color: "green",
  },
  errorMessage: {
    color: "red",
  },
};

const SignOutForm = ({ classes, handleSubmit, submitting, status }) => {
  return (
    <div>
      <h1>Sign Out Form</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <button type="submit" disabled={submitting}>
            Sign Out
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
  status: state.accounts.signOutStatus,
});

const SmartSignOutForm = connect(mapStateToProps, null)(
  injectSheet(styles)(SignOutForm),
);

export default reduxForm({
  form: "signOut",
})(SmartSignOutForm);
