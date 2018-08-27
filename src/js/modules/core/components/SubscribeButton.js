import React from "react";
import injectSheet from "react-jss";

const styles = {
  SubscribeButton: {
    width: "10vw",
    height: "6vh",
    minWidth: "160px",
    position: "relative",
    borderRadius: 0,
    borderTopLeftRadius: "4px",
    borderBottomLeftRadius: "4px",
    backgroundColor: "#DB2B39",
    border: "solid 1.5px #DB2B39",
    display: "inline",
    transition: "filter 0.8s",
    "&:hover": {
      filter: "opacity(75%)"
    }
  },
  text: {
    fontFamily: "Circular Std",
    fontSize: "2rem",
    fontWeight: "bold",
    textAlign: "center",
    color: "#fff"
  },
  subscribeTo: {
    position: "relative",
    top: "-7px",
    fontFamily: "Circular Std",
    fontSize: "1.5rem",
    textAlign: "center",
    color: "#ffffff"
  }
};

const SubscribeButton = ({ onClick, classes }) => {
  return (
    <button onClick={onClick} className={classes.SubscribeButton}>
      <span className={classes.text}>Subscribe</span>
      <br />
      <span className={classes.subscribeTo}>to our newsletter</span>
    </button>
  );
};

export default injectSheet(styles)(SubscribeButton);
