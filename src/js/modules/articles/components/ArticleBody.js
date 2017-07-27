import React from 'react';
import injectSheet from 'react-jss';

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
  Figure: {
    margin: '0px 0px 13px 0px',
    width: '100%',
  },
  Figure__image: {
    width: '100%',
  },
  Figure__caption: {
    fontFamily: 'Minion Pro',
    fontSize: '14px',
    lineHeight: '1.07',
    '& span:last-child': {
      color: '#888',
    },
  },
}

const ArticleBody = ({ classes, content, featured }) => {
  return(
    <div className={ classes.ArticleBody }>
      <figure className={ classes.Figure }>
        <img className={ classes.Figure__image} src={ featured.url }/>
        <figcaption className={ classes.Figure__caption}>
          <span>{ featured.caption } </span>
          <span>{ featured.type } by { featured.credits }</span>
        </figcaption>
      </figure>
      <div dangerouslySetInnerHTML={{ __html: content }}>
      </div>
    </div>
  )
}

export default injectSheet(styles)(ArticleBody);