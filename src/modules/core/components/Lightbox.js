import React from "react";
import injectSheet from "react-jss";

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
    alignItems: "center",
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
    alignItems: "center",
    color: "#fff",
    display: "flex",
    height: "36px",
    left: 0,
    lineHeight: "31px",
    paddingRight: "72px",
    position: "absolute",
    top: "32px",
  },
  headerLogo: {
    fontFamily: "Old English Text MT",
    fontSize: "31px",
    lineHeight: 0,
    marginLeft: "30px",

    // we don't want "The Spectator" to line-wrap.
    minWidth: "179px",
  },
  headerSpacer: {
    borderLeft: "1px solid #fff",
    height: "100%",
    marginLeft: "15px",
  },
  headerTitle: {
    fontFamily: "Minion Pro",
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
  isVisible,
  onClose,
}) => {
  if (isVisible) {
    return (
      <div className={classes.Lightbox}>
        <div className={classes.lightboxHeader}>
          <div className={classes.headerLogo}>The Spectator</div>
          <div className={classes.headerSpacer} />
          <div className={classes.headerTitle}>{title}</div>
        </div>
        <div className={classes.contentContainer}>
          <button onClick={onClose} className={classes.closeButton} />
          {children}
        </div>
      </div>
    );
  } else {
    return <span className="lightbox-in-hiding" />;
  }
};

export default injectSheet(styles)(Lightbox);
