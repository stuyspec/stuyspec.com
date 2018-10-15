import React from "react";
import { connect } from "react-redux";
import injectSheet from "react-jss";

import { pathToAds } from "../constants";

const styles = {
  TallAd: {
    width: "100%",
  },
  img: {
    width: "100%",
  },
};

const TallAd = ({ classes, advertisements, ad }) => {
  if (!ad) {
    ad = advertisements[0];
  }
  return (
    <div className={classes.TallAd}>
      <a href={ad.url} target="_blank">
        <img className={classes.img} src={pathToAds + ad.filename} />
      </a>
    </div>
  );
};

const mapStateToProps = state => ({
  advertisements: state.advertisements,
});

export default connect(mapStateToProps)(injectSheet(styles)(TallAd));
