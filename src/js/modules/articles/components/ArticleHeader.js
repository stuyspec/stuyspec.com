import React from 'react';
import { Link } from 'react-router-dom';
import injectSheet from 'react-jss';

const styles = {
  ArticleHeader: {
    borderTop: '1px solid #000',
    borderBottom: '1px solid #dedede',
    margin: '78px 0px 20px 0px',
    padding: '12px 0px',
  },
  rubric: {
    color: '#000',
    display: 'block',
    fontFamily: 'Circular Std',
    fontSize: '12px',
    fontWeight: 500,
    marginBottom: '18px',
    textDecoration: 'none',
    textTransform: 'uppercase',
  },
  headline: {
    color: '#000',
    fontFamily: 'Minion Pro',
    fontSize: '36px',
    fontWeight: 'normal',
    marginTop: '0px',
    marginBottom: '15px',
  },
  metaInfo: {
    fontFamily: 'Minion Pro',
    fontSize: '14px',
    color: '#000000',
    margin: '0px',
    '& div:first-child': {
      display: 'inline',
      fontWeight: 'bold',
      marginRight: '9px',
      '& div': {
        display: 'inline',
        margin: 0,
      }
    },
  },
  byline: {
    '& div': {
      display: 'inline',
      margin: 0,
      '& a': {
        color: '#000',
        '&:hover': {
          color: '#000'
        },
      },
    },
  },
};

// TODO: make selector for dateline

const ArticleHeader = ({ classes, section, headline, byline, dateline }) => {
  return (
    <div className={classes.ArticleHeader}>
      <Link to={section.permalink} className={classes.rubric}>
        {section.name}
      </Link>
      <h1 className={classes.headline}>{headline}</h1>
      <div className={classes.metaInfo}>
        <div className={classes.byline}>{byline}</div>
        <span>{dateline}</span>
      </div>
    </div>
  );
};

export default injectSheet(styles)(ArticleHeader);
