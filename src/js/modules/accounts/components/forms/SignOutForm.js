import React from "react";
import { reduxForm } from "redux-form";

const SignOutForm = ({ handleSubmit, submitting }) => {
  return (
    <div>
      <h1>Sign Out Form</h1>
      <form onSubmit={ handleSubmit }>
        <div>
          <button type="submit" disabled={ submitting }>
            Sign Out
          </button>
        </div>
      </form>
    </div>
  )
}

export default reduxForm({
  form: 'signOut',
})(SignOutForm)