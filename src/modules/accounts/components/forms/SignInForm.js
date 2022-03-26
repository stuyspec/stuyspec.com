import React from 'react';
import { compose } from 'redux';
import { Field, reduxForm } from 'redux-form';
import injectSheet from 'react-jss';
import { EMAIL_REGEX } from '../../../../constants';

import { FormStatus, RenderField } from './helpers';

const styles = {
  SignInForm: {
    fontFamily: 'Minion Pro',
    width: '100%',
    '& form div': {
      // each Field
      marginBottom: '7px',
    },
  },
  submitButton: {
    backgroundColor: '#3472b7',
    border: '1px solid #3472b7',
    borderRadius: '3px',
    color: '#fff',
    fontSize: '15px',
    fontStyle: 'italic',
    height: '32px',
    marginTop: '15px',
    textAlign: 'center',
    width: '90px',
    '&:disabled': {
      background: '#ddd',
      borderColor: '#ddd',
      color: '#888',
    },
  },
};

const validate = formValues => {
  const errors = {};
  if (!formValues.email) {
    errors.email = 'Required';
  } else if (!EMAIL_REGEX.test(formValues.email)) {
    errors.email = 'Invalid email address';
  }
  return errors;
};

function SignInForm({ classes, handleSubmit, submitting }) {
  return (
    <div className={classes.SignInForm}>
      <form onSubmit={handleSubmit}>
        <Field
          name="email"
          type="email"
          autoComplete="email"
          component={RenderField}
          label="Email"
        />
        <Field
          name="password"
          type="password"
          autoComplete="current-password"
          component={RenderField}
          label="Password"
        />
        <div>
          <button
            type="submit"
            disabled={submitting}
            className={classes.submitButton}
          >
            Sign In
          </button>
        </div>
      </form>
      <FormStatus formName="signIn" />
    </div>
  );
}

export default compose(
  reduxForm({
    form: 'signIn',
    validate,
  }),
  injectSheet(styles),
)(SignInForm);
