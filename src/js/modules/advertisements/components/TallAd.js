import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import injectSheet from 'react-jss';

import { pathToAds } from '../constants';

const styles = {
  TallAd: {
    width: '100%',
  },
  img: {
    width: '100%',
  },
};

const TallAd = ({ classes, advertisements, ad }) => {
  if (!ad) {
    ad = advertisements[0];
  }
  return (
    <div className={classes.TallAd}>
      <Link to={ad.url} target='_blank'>
        <img className={classes.img} src={pathToAds + ad.filename} />
      </Link>
    </div>
  );
};

const mapStateToProps = state => ({
  advertisements: state.advertisements,
});

export default connect(mapStateToProps)(injectSheet(styles)(TallAd));
