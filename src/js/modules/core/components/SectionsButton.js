import React from "react";
import injectSheet from "react-jss";
import { Hamburger } from '../icons'

const styles = {
  SectionsButton: {
    display: "flex",
    alignItems: "center",
    width: "9vw",
    height: "6vh",
    minWidth: "111px",
    minHeight: "39px",
    paddingRight: "10px",
    borderRadius: "3px",
    border: "solid 1.5px #dddddd",
    backgroundColor: "white",
    float: "left",
    "&:hover p": {
      color: "#888",
    },
  },
  hamburger: {
    width: "3vw",
    height: "3vh",
    minWidth: "24px",
    minHeight: "23px",
    opacity: 0.48,
    marginRight: "0.4vw",
  },
  text: {
    fontFamily: "Circular Std",
    fontSize: "1.6rem",
    fontWeight: "bold",
    margin: 0,
    color: "#000",
    transitionDuration: ".3s",
  },
};

const SectionsButton = ({ onClick, classes }) => {
  return (
    <button onClick={onClick} className={classes.SectionsButton}>
      <Hamburger className={classes.hamburger} />
      <p className={classes.text}>Sections</p>
    </button>
  );
};

export default injectSheet(styles)(SectionsButton);
