import React from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import injectJSS from "react-jss";

import { openLightbox, closeLightbox } from "../actions";

const styles = {
  Lightbox: {
    background: "#000",
    display: "flex",
    "-webkit-box-align": "center",
    "-ms-flex-align": "center",
    alignItems: "center",
    display: "-webkit-box",
    display: "-ms-flexbox",
    display: "flex",
    height: "100%",
    "-webkit-box-pack": "center",
    "-ms-flex-pack": "center",
    justifyContent: "center",
    left: 0,
    padding: "44px 0 0",
    position: "fixed",
    top: 0,
    width: "100%!important",
    zIndex: 10000,
  },
  closeButton: {
    background: "transparent",
    border: 0,
    cursor: "pointer",
    height: "24px",
    left: "auto",
    position: "absolute",
    right: "35px",
    top: "35px",
    width: "24px",
    "&:before, &:after": {
      position: "absolute",
      content: '" "',
      top: 0,
      left: "12px",
      height: "24px",
      width: "2px",
      backgroundColor: "#fff",
    },
    "&:before": {
      transform: "rotate(45deg)",      
    },
    "&:after": {
      transform: "rotate(-45deg)",
    },
  },
};

const Lightbox = ({
  classes,
  children,
  lightboxIsOpen,
  openLightbox,
  closeLightbox,
}) => {
  if (lightboxIsOpen) {
    return (
      <div className={classes.Lightbox}>
        <button onClick={closeLightbox} className={classes.closeButton}></button>
        {children}
      </div>
    );
  } else {
    return <span className="lightbox-in-hiding" />;
  }
};

const mapStateToProps = state => ({
  lightboxIsOpen: state.core.lightboxIsOpen,
});

const mapDispatchToProps = dispatch => {
  return bindActionCreators({ openLightbox, closeLightbox }, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(
  injectJSS(styles)(Lightbox),
);
