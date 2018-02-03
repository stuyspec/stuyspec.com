import React from "react";
import { connect } from "react-redux";
import injectSheet from "react-jss";

const styles = {
  successMessage: {
    color: "green",
  },
  errorMessage: {
    color: "red",
  },
};

const FormStatus = ({ classes, status, formName }) => {
  if (status.formName === formName) {
    return (
      <div>
        <p key="success" className={classes.successMessage}>
          {status.message}
        </p>
        {status.errors.map(error => {
          return (
            <p key={error} className={classes.errorMessage}>
              {error}
            </p>
          );
        })}
      </div>
    );
  }
  return null;
};

const mapStateToProps = state => ({
  status: state.accounts.status,
});

export default connect(mapStateToProps)(injectSheet(styles)(FormStatus));
