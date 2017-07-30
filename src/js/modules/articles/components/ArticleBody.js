import React from 'react';
import injectSheet from 'react-jss';

import ArticleFeaturedMedia from './ArticleFeaturedMedia';

const styles = {
  ArticleBody: {
    color: '#000',
    fontFamily: 'Minion Pro',
    fontSize: '18px',
    lineHeight: 1.44,
    width: '700px',
    '& p:first-child::first-letter': {
      float: 'left',
      fontSize: '58px',
      lineHeight: '43px',
      padding: '7px 6px 0px 3px',
    },
  },
  featuredMedia: {
    margin: '0px 0px 13px 0px',
    width: '100%',
    '& .img': {
      width: '100%'
    },
    '& .caption': {
      fontFamily: 'Minion Pro',
      fontSize: '14px',
      lineHeight: '1.07',
      '& span:last-child': {
        color: '#888'
      },
    },
  },
};

const ArticleBody = ({ classes, content, featuredMedia }) => {
  return(
    <div className={ classes.ArticleBody }>
      <ArticleFeaturedMedia featuredMedia={featuredMedia}/>
      <div dangerouslySetInnerHTML={{ __html: content }}>
      </div>
    </div>
  );
};

export default injectSheet(styles)(ArticleBody);
