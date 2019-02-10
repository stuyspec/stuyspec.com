import React from "react";
import injectSheet from "react-jss";

const styles = {
  SubscribeButton: {
    width: "8vw",
    height: "45px",
    padding: "4px 0",
    lineHeight: "1.5rem",
    minWidth: "135px",
    maxWidth: "150px",
    position: "relative",
    borderRadius: 0,
    borderTopLeftRadius: "4px",
    borderBottomLeftRadius: "4px",
    backgroundColor: "#DB2B39",
    border: "solid 1.5px #DB2B39",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "space-around",
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
  },
  subscribeTo: {
    fontFamily: "Circular Std",
    fontSize: "1.4rem",
    textAlign: "center",
    color: "#ffffff",
  },
};

const SubscribeButton = ({ onClick, classes }) => {
  return (
    <button onClick={onClick} className={classes.SubscribeButton}>
      <span className={classes.text}>Subscribe</span>
      <span className={classes.subscribeTo}>to our newsletter</span>
    </button>
  );
};

export default injectSheet(styles)(SubscribeButton);
