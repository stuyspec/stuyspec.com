import React from "react";
import injectSheet from "react-jss";

const styles = {
  SliderFooter: {
    alignItems: "center",
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-end",
    marginTop: "20px",
  },
  index: {
    color: "#ddd",
    fontFamily: "Circular Std",
  },
  carouselControls: {
    alignItems: "flex-end",
    display: "flex",
  },
  controlButton: {
    background: "#333",
    border: 0,
    borderRadius: "2px",
    color: "#bbb",
    fontFamily: "Circular Std",
    fontSize: "14px",
    fontWeight: 500,
    height: "48px",
    lineHeight: 1,
    outline: "none",
    marginLeft: "10px",
    padding: "15px",
    position: "relative",
    verticalAlign: "middle",
    width: "48px",
  },
};

const SliderFooter = ({ classes, helperText, nextSlide, prevSlide }) => {
  return (
    <div className={classes.SliderFooter}>
      <div className={classes.index}>{helperText}</div>
      <div className={classes.carouselControls}>
        <button className={classes.controlButton} onClick={prevSlide}>
          &lt;
        </button>
        <button className={classes.controlButton} onClick={nextSlide}>
          &gt;
        </button>
      </div>
    </div>
  );
};

export default injectSheet(styles)(SliderFooter);
