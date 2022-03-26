import React from 'react';
import injectSheet from 'react-jss';

const styles = {
  input: {
    width: '100%',
  },
  syncValidation: {
    color: 'red',
    margin: '10px 0 0 0',
  },
};

function RenderField({
  classes,
  input,
  label,
  isLabelVisible = true,
  type,
  meta: { touched, error },

  // The autoComplete input attribute helps password managers infer the purpose
  // of a field in a form. Proper usage of autoCompletes means better UX.
  autoComplete,
}) {
  return (
    <div>
      {isLabelVisible && <label>{label}</label>}
      <div>
        <input
          className={classes.input}
          {...input}
          autoComplete={autoComplete}
          placeholder={label}
          type={type}
        />
        {touched
          && (error && <p className={classes.syncValidation}>{error}</p>)}
      </div>
    </div>
  );
}

export default injectSheet(styles)(RenderField);
