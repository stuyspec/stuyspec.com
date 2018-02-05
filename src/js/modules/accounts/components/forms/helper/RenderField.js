import React from "react";
import injectSheet from "react-jss";

const styles = {
  input: {
    width: "100%",
  },
  syncValidation: {
    color: "red",
    margin: "10px 0 0 0",
  },
};

const RenderField = ({
  classes,
  input,
  label,
  isLabelVisible = true,
  autoComplete,
  type,
  meta: { touched, error },
}) => {
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
        {touched &&
          (error && <p className={classes.syncValidation}>{error}</p>)}
      </div>
    </div>
  );
};

export default injectSheet(styles)(RenderField);