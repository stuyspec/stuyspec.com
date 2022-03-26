import React from 'react';
import { compose } from 'redux';
import { Field, reduxForm } from 'redux-form';
import injectSheet from 'react-jss';
import { EMAIL_REGEX } from '../../../../constants';

import { FormStatus, RenderField } from './helpers';

const styles = {
  submitButton: {
    backgroundColor: '#e2130b !important',
    border: 'none',
    borderRadius: '3px',
    color: '#fff',
    fontFamily: 'Circular Std',
    fontSize: '15px',
    fontWeight: 300,
    padding: '11px',
    margin: '9px 0 0 0',
    width: '275px',
    maxWidth: '90%',
    '&:disabled': {
      background: '#ddd',
      borderColor: '#ddd',
      color: '#888',
    },
  },
  input: {
    backgroundColor: '#eee',
    border: '1px solid white',
    borderRadius: '3px',
    fontFamily: 'Circular Std',
    fontSize: '15px',
    fontWeight: 300,
    padding: '11px',
    width: '275px',
    maxWidth: '90%',
  },
  syncValidation: {
    color: 'red',
    fontFamily: 'Minion Pro',
    margin: '10px 0 0 0',
  },
};

const validate = formValues => {
  const errors = {};
  if (!formValues.email) {
    errors.email = 'No email detected';
  } else if (!EMAIL_REGEX.test(formValues.email)) {
    errors.email = 'Invalid email address';
  }
  return errors;
};

function SubscriptionForm({
  classes,
  handleSubmit,
  submitting,
  callToAction,
}) {
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <Field
          name="email"
          type="email"
          autoComplete="email"
          component={RenderField}
          isLabelVisible={false}
          label="Enter your e-mail address."
          classes={classes}
        />
        <div>
          <button
            type="submit"
            disabled={submitting}
            className={classes.submitButton}
          >
            {callToAction || 'Subscribe'}
          </button>
        </div>
      </form>
      <FormStatus formName="subscription" />
    </div>
  );
}

export default compose(
  reduxForm({
    form: 'subscription',
    validate,
  }),
  injectSheet(styles),
)(SubscriptionForm);
