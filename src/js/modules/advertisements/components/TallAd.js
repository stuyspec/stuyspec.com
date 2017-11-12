import React from "react";
import { Link } from "react-router-dom";
import injectSheet from "react-jss";

const styles = {
  TallAd: {
    width: "100%",
  },
  img: {
    width: "100%",
  },
};

const TallAd = ({ classes }) => {
  return (
    <div className={classes.TallAd}>
      <Link to="http://apple.com">
        <img className={classes.img} src="https://imgur.com/OQ9X2wp"/>
      </Link>
    </div>
  );
};

export default injectSheet(styles)(TallAd);
