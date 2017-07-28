import React from 'react';
import injectSheet from 'react-jss';

const styles = {
  figure: {
    margin: '0px 0px 13px 0px',
    width: '100%',
  },
  img: {
    width: '100%',
  },
  caption: {
    fontFamily: 'Minion Pro',
    fontSize: '14px',
    lineHeight: '1.07',
    '& span:last-child': {
      color: '#888'
    },
  },
};

const ArticleFeaturedMedia = ({ classes, featuredMedia }) => {
  return (
    <figure className={classes.figure}>
      <img className={classes.img} src={featuredMedia.url}/>
      <figcaption className={classes.caption}>
        <span>{featuredMedia.caption} </span>
        <span>{featuredMedia.type} by {featuredMedia.credits}</span>
      </figcaption>
    </figure>
  );
};

export default injectSheet(styles)(ArticleFeaturedMedia);
