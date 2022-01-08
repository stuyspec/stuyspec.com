import React from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import injectSheet from 'react-jss';

const styles = {
  FormStatus: {
    fontFamily: 'Minion Pro',
  },
  successMessage: {
    color: 'green',
    marginTop: '10px',
  },
  errorMessage: {
    color: 'red',
  },
};

function FormStatus({
  classes, status, formName, redirect, history,
}) {
  // The FormStatus component is shared on most forms. We have a status with
  // the current formName in external state so the FormStatus doesn't display
  // messages on one form that was actually meant for another form.
  if (status.formName !== formName) {
    return null;
  }

  // If form success and redirect path specified by the form, alert
  // confirmation and redirect user.
  if (status.message && redirect) {
    alert(status.message);
    history.push(redirect);
  }

  return (
    <div className={classes.FormStatus}>
      <p key="success" className={classes.successMessage}>
        {status.message}
      </p>
      {status.errors.map(error => (
        <p key={error} className={classes.errorMessage}>
          {error}
        </p>
      ))}
    </div>
  );
}

const mapStateToProps = state => ({
  status: state.accounts.status,
});

export default compose(
  withRouter,
  connect(mapStateToProps),
  injectSheet(styles),
)(FormStatus);
