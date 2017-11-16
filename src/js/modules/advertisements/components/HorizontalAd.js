import React from "react";
import { Link } from "react-router-dom";
import injectSheet from "react-jss";

const styles = {
  HorizontalAd: {
    width: "100%",
  },
  img: {
    width: "100%",
  },
};

const HorizontalAd = ({ classes }) => {
  return (
    <div className={classes.HorizontalAd}>
      <Link to="http://apple.com">
        <img className={classes.img} src="https://imgur.com/OQ9X2wp.png" />
      </Link>
    </div>
  );
};

export default injectSheet(styles)(HorizontalAd);
