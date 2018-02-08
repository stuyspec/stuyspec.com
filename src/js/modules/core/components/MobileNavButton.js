import React from "react";
import injectSheet from "react-jss";

const navButtonStyles = {
  MobileNavButton: {
    background: "none",
    borderWidth: 0,
    display: "none",
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
    textTransform: "uppercase",
  },
  icon: {
    display: "inline",
    marginRight: "4px",
  },
  "@media (max-width: 991px)": {
    MobileNavButton: {
      display: "inline",
    },
  },
};

const MobileNavButton = ({ classes, children, label, onClick }) => {
  return (
    <button className={classes.MobileNavButton} onClick={onClick}>
      <div className={classes.icon}>{children}</div>
      <span className={classes.buttonText}>{label}</span>
    </button>
  );
};

export default injectSheet(navButtonStyles)(MobileNavButton);
