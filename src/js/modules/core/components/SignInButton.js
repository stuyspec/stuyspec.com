import React from "react"
import injectSheet from "react-jss"

const styles = {
  SignIn: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 0,
    borderTopRightRadius: "4px",
    minHeight: "39px",
    borderBottomRightRadius: "4px",
    backgroundColor: "#ffffff",
    border: "solid 1.5px #dddddd",
    borderLeft: 0,
    height: "6vh",
    width: "5vw",
    minWidth: "66px",
    display: "inline",
    position: "relative",
    "& span": {
      transitionDuration: ".3s",
    },
    "&:hover span": {
      color: "#888",
    },
  },
  text: {
    fontFamily: "Circular Std",
    fontSize: "1.5rem",
    margin: 0,
    fontWeight: "bold",
    color: "#000000",
  },
}

const SignInButton  = ({ classes}) => {
  return (
    <button className={classes.SignIn}>
      <p className={classes.text}>Sign In</p>
    </button>
  );
};

export default injectSheet(styles)(SignInButton);