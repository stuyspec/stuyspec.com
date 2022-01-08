import React from 'react';
import { connect } from 'react-redux';
import injectSheet from 'react-jss';

import { pathToAds } from '../constants';

const styles = {
  HorizontalAd: {
    width: '100%',
  },
  img: {
    width: '80%',
  },
};

function HorizontalAd({ classes, advertisements }) {
  const len = Object.keys(advertisements).length;
  if (len > 0) {
    return (
      <div className={classes.HorizontalAd}>
        {Object.values(advertisements).map(ad => (
          <a href={ad.url} target="_blank" rel="noopener noreferrer">
            <img className={classes.img} src={pathToAds + ad.filename} alt="Advertisement" />
          </a>
        ))}
      </div>
    );
  }
  return null;
}

const mapStateToProps = state => ({
  advertisements: state.advertisements,
});

export default connect(mapStateToProps)(injectSheet(styles)(HorizontalAd));
