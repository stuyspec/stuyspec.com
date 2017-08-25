import React from "react";
import injectSheet from "react-jss";

const styles = {
  figure: {
    margin: 0,
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

const ArticleFeaturedMedia = ({
                                classes,
                                featuredMedia: { url, caption, type, creator },
                                putCaption
                              }) => {
  return (
    <figure className={ classes.figure }>
      <img className={ classes.img } src={ url }/>
      {
        putCaption && (
          <figcaption className={ classes.caption }>
            <span>{ caption }&nbsp;</span>
            <Link className={ classes.creditLine }
                  to={ `/${ ROLE_SLUG_OF_MEDIA_TYPE[ type ] }/${creator.slug}` }>
              { capitalizeFirstLetter(type) }
              &nbsp;by&nbsp;
              { `${creator.firstName} ${creator.lastName}` }
            </Link>
          </figcaption>
        )
      }
    </figure>
  );
};

export default injectSheet(styles)(ArticleFeaturedMedia);
