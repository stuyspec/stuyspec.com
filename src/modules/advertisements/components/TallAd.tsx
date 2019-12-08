import React from 'react';
import { connect } from 'react-redux';
import { createUseStyles } from 'react-jss';

import { pathToAds } from '../constants';

const styles = {
  TallAd: {
    width: "100%",
  },
  img: {
    width: "100%",
  },
};

const useStyles = createUseStyles(styles);

interface IProps {
  advertisements: any[],
  ad?: any,
}

const TallAd: React.FC<IProps> = ({ advertisements, ad }) => {
  const classes = useStyles();

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

const mapStateToProps = (state: any) => ({
  advertisements: state.advertisements,
});

export default connect(mapStateToProps)(TallAd);
