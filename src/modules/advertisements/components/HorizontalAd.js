import React from "react";
import { connect } from "react-redux";
import injectSheet from "react-jss";

import { pathToAds } from "../constants";

const styles = {
  HorizontalAd: {
    width: "100%",
  },
  img: {
    height: "500px",
  },
};

const HorizontalAd = ({ classes, advertisements }) => {
  const ad = advertisements[0];
  if (ad) {
    return (
      <div className={classes.HorizontalAd}>
        <a href={ad.url} target="_blank">
          <img className={classes.img} src={pathToAds + ad.filename}/>
        </a>
      </div>
    );
  }
  else return null;
};

const mapStateToProps = state => ({
  advertisements: state.advertisements,
});

export default connect(mapStateToProps)(injectSheet(styles)(HorizontalAd));
