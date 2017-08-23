import React from "react";
import injectSheet from "react-jss";

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
    marginTop: '7px',
  },
  creditLine: {
    color: '#888',
  },
};

const ArticleFeaturedMedia = ({ classes, featuredMedia }) => {
  return (
    <figure className={ classes.figure }>
      <img className={ classes.img } src={ featuredMedia.url }/>
      <figcaption className={ classes.caption }>
        <span>{ featuredMedia.caption }&nbsp;</span>
        <Link className={ classes.creditLine }
              to={ `/${MEDIA_CREATOR_SLUG[ type ]}/${creator.slug}` }>
          { capitalizeWord(type) }
          &nbsp;by&nbsp;
          { `${creator.firstName} ${creator.lastName}` }
        </Link>
        );
      </figcaption>
    </figure>
  );
};

export default injectSheet(styles)(ArticleFeaturedMedia);
