import React from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import injectJSS from "react-jss";

import { openLightbox, closeLightbox } from "../actions";

const styles = {
  Lightbox: {
    background: "#000",
    height: "100%",
    left: 0,
    padding: "44px",
    position: "fixed",
    top: 0,
    width: "100%!important",
    zIndex: 10000,
  },
  contentContainer: {
    display: "flex",
    "-webkit-box-align": "center",
    "-ms-flex-align": "center",
    alignItems: "center",
    display: "-webkit-box",
    display: "-ms-flexbox",
    display: "flex",
    "-webkit-box-pack": "center",
    "-ms-flex-pack": "center",
    justifyContent: "center",
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
  lightboxHeader: {
    "-webkit-box-align": "center",
    "-ms-flex-align": "center",
    alignItems: "center",
    display: "-webkit-box",
    display: "-ms-flexbox",
    display: "flex",
    lineHeight: "31px",
    color: "#fff",
    height: "36px",
  },
  headerLogo: {
    fontFamily: "Old English Text MT",
    fontSize: "31px",
    lineHeight: 0,
  },
  headerSpacer: {
    borderLeft: "1px solid #fff",
    height: "100%",
    marginLeft: "15px",
  },
  headerTitle: {
    fontFamily: "Minion Pro",//Minion Pro",
    fontSize: "21px",
    marginLeft: "15px",
    position: "relative",
    top: "2px",
  },
};

const Lightbox = ({
  classes,
  children,
  title,
  lightboxIsOpen,
  openLightbox,
  closeLightbox,
}) => {
  if (lightboxIsOpen) {
    return (
      <div className={classes.Lightbox}>
        <div className={classes.lightboxHeader}>
          <div className={classes.headerLogo}>The Spectator</div>
          <div className={classes.headerSpacer}></div>
          <div className={classes.headerTitle}>{title}</div>
        </div>
        <div className={classes.contentContainer}>
          <button onClick={closeLightbox} className={classes.closeButton}></button>
          {children}
        </div>
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
