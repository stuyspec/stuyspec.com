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
  signOutButton: {
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
    width: "85px"
  },
};

const SignOutForm = ({ classes, handleSubmit, submitting, status }) => {
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div>
          <button type="submit" disabled={submitting} className={classes.signOutButton}>
            Sign Out
          </button>
        </div>
      </form>
      {status.formName === "signOut" && (
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

const ConnectedSignOutForm = connect(mapStateToProps)(
  injectSheet(styles)(SignOutForm),
);

export default reduxForm({
  form: "signOut",
})(ConnectedSignOutForm);
