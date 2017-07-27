import React from 'react';
import { Link } from 'react-router-dom';
import injectSheet from 'react-jss';

const styles = {
  ArticleHeader: {
    borderTop: '1px solid #000',
    borderBottom: '1px solid #dedede',
    marginBottom: '20px',
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
    fontSize: '14px',
    color: '#000000',
    margin: '0px',
    '& span:first-child': {
      fontWeight: 'bold',
      marginRight: '9px',
    },
  },
};

const ArticleHeader = ({ classes, section, headline, byline, dateline }) => {
  // TODO: make link to section work
  return (
    <div className={classes.ArticleHeader}>
      <Link to={'/thisLinkNoWork'} className={classes.rubric}>
        {section.name}
      </Link>
      <h1 className={classes.headline}>{headline}</h1>
      <p className={classes.metaInfo}>
        <span>{byline}</span>
        <span>{dateline}</span>
      </p>
    </div>
  );
};

export default injectSheet(styles)(ArticleHeader);
