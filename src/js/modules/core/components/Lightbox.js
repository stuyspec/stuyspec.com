import React from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import injectJSS from "react-jss";

import { openLightbox, closeLightbox } from "../actions";

const styles = {
  Lightbox: {
    background: "rgba(0, 0, 0, .9)",
    height: "100%",
    left: 0,
    padding: "100px 30px 30px 60px",
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
    height: "100%",
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
    left: 0,
    position: "absolute",
    top: "32px",
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
    marginLeft: "30px",
    minWidth: "179px", // we don't want "The Spectator" to line-wrap.
  },
  headerSpacer: {
    borderLeft: "1px solid #fff",
    height: "100%",
    marginLeft: "15px",
  },
  headerTitle: {
    fontFamily: "Minion Pro", //Minion Pro",
    fontSize: "21px",
    marginLeft: "15px",
    position: "relative",
    top: "2px",
  },
  "@media (max-width: 767px)": {
    lightboxHeader: {
      display: "none",
    },
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
          <div className={classes.headerSpacer} />
          <div className={classes.headerTitle}>{title}</div>
        </div>
        <div className={classes.contentContainer}>
          <button onClick={closeLightbox} className={classes.closeButton} />
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
