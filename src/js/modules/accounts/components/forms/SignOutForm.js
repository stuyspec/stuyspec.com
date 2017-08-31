import React from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { reduxForm } from "redux-form";
import injectSheet from "react-jss";

import { signOut } from "../../actions";

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
      <form onSubmit={handleSubmit}>
        <div>
          <button type="submit" disabled={submitting}>
            Sign Out
          </button>
        </div>
      </form>
      {status.form === "signOut" && (
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
  session: state.accounts.session,
  status: state.accounts.status,
});

const SmartSignOutForm = connect(mapStateToProps)(
  injectSheet(styles)(SignOutForm),
);

export default reduxForm({
  form: "signOut",
})(SmartSignOutForm);
