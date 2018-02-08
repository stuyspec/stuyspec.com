import React from "react";
import injectSheet from "react-jss";

const navButtonStyles = {
  NavButton: {
    background: "none",
    borderWidth: 0,
    margin: 0,
    padding: 0,
    "&:hover": {
      cursor: "pointer",
    },
  },
  buttonText: {
    color: "#000",
    fontFamily: "Circular Std",
    fontSize: "12px",
    fontWeight: "bold",
  },
  icon: {
    display: "inline",
    marginRight: "4px",
  },
  "@media (max-width: 768px)": {
    buttonText: {
      display: "none",
    },
  },
};

const NavButton = ({ classes, children, label, onClick }) => {
  return (
    <button className={classes.NavButton} onClick={onClick}>
      <div className={classes.icon}>{children}</div>
      <span className={classes.buttonText}>{label}</span>
    </button>
  );
};

export default injectSheet(navButtonStyles)(NavButton);
