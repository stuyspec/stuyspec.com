import React from "react";
import { Field, reduxForm } from "redux-form";

const validate = values => {
  const errors = {}
  if (!values.firstName) {
    errors.firstName = 'Required';
  }
  if (!values.lastName) {
    errors.lastName = 'Required';
  }
  if (!values.email) {
    errors.email = 'Required'
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    errors.email = 'Invalid email address';
  }
  return errors
};

const renderField = ({
                       input,
                       label,
                       type,
                       meta: { touched, error, warning }
                     }) => {
  return (
    <div>
      <label>
        { label }
      </label>
      <div>
        <input { ...input } placeholder={ label } type={ type }/>
        { touched &&
        ((error &&
          <span>
            { error }
          </span>) ||
          (warning &&
            <span>
              { warning }
            </span>)) }
      </div>
    </div>
  );
};

const SignUpForm = ({ handleSubmit, submitting }) => {
  return (
    <form onSubmit={ handleSubmit }>
      <Field name="firstName" type="text" component={ renderField } label="First Name"/>
      <Field name="lastName" type="text" component={ renderField } label="Last Name"/>
      <Field name="email" type="email" component={ renderField } label="Email"/>
      <Field name="password" type="text" component={ renderField } label="Password"/>
      <Field name="passwordConfirmation" type="text" component={ renderField } label="Password Confirmation"/>
      <div>
        <button type="submit" disabled={ submitting }>
          Submit
        </button>
      </div>
    </form>
  )
}

export default reduxForm({
  form: 'signUp',
  validate,
})(SignUpForm)