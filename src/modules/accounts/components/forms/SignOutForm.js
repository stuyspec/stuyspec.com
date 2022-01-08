import React from 'react';
import { compose } from 'redux';
import { reduxForm } from 'redux-form';
import injectSheet from 'react-jss';

import { FormStatus } from './helpers';

const styles = {
  signOutButton: {
    backgroundColor: '#3472b7',
    border: '1px solid #3472b7',
    borderRadius: '3px',
    color: '#fff',
    fontFamily: 'Minion Pro',
    fontSize: '15px',
    fontStyle: 'italic',
    height: '32px',
    marginTop: '15px',
    textAlign: 'center',
    width: '85px',
  },
};

function SignOutForm({ classes, handleSubmit, submitting }) {
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div>
          <button
            type="submit"
            disabled={submitting}
            className={classes.signOutButton}
          >
            Sign Out
          </button>
        </div>
      </form>
      <FormStatus formName="signOut" />
    </div>
  );
}

export default compose(
  reduxForm({
    form: 'signOut',
  }),
  injectSheet(styles),
)(SignOutForm);
