import React from "react";
import injectSheet from "react-jss";

const styles = {
  SubscribeButton: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    minWidth: "135px",
    position: "relative",
    borderRadius: 0,
    height: "6vh",
    minHeight: "39px",
    borderTopLeftRadius: "4px",
    borderBottomLeftRadius: "4px",
    backgroundColor: "#DB2B39",
    border: "solid 1.5px #DB2B39",
    transition: "filter 0.8s",
    "&:hover": {
      filter: "opacity(75%)",
    },
  },
  text: {
    fontFamily: "Circular Std",
    fontSize: "1.6rem",
    fontWeight: "bold",
    textAlign: "center",
    color: "#fff",
    lineHeight: 1.1,
  },
  subscribeTo: {
    lineHeight: 1.1,
    position: "relative",
    fontFamily: "Circular Std",
    fontSize: "1.3rem",
    textAlign: "center",
    color: "#fff",
  },
};

const SubscribeButton = ({ onClick, classes }) => {
  return (
    <button onClick={onClick} className={classes.SubscribeButton}>
      <div className={classes.text}>Subscribe</div>
      <div className={classes.subscribeTo}>to our newsletter</div>
    </button>
  );
};

export default injectSheet(styles)(SubscribeButton);
