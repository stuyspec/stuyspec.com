import React from "react";
import { Link } from "react-router-dom";
import injectSheet from "react-jss";

import Byline from "./Byline";

const styles = {
  ArticleHeader: {
    borderTop: '1px solid #000',
    borderBottom: '1px solid #dedede',
    color: '#000',
    fontFamily: 'Minion Pro',
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
    width: '36px',
    '&:hover': {
      color: '#000',
    },
  },
  headline: {
    color: '#000',
    fontFamily: 'Minion Pro',
    fontSize: '36px',
    fontWeight: 'normal',
    marginTop: 0,
    marginBottom: '15px',
  },
  Byline: {
    display: 'inline',
    fontSize: '14px',
    fontWeight: 'bold',
    marginRight: '9px',
    '& p': {
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
  dateline: {
    fontSize: '14px',
  }
};

// TODO: make selector for dateline

const ArticleHeader = ({
                         classes,
                         article: { contributors, dateline, title },
                         section,
                       }) => {
  return (
    <div className={ classes.ArticleHeader }>
      <Link to={ section.permalink } className={ classes.rubric }>
        { section.name }
      </Link>
      <h1 className={ classes.headline }>{ title }</h1>
      <Byline classes={ classes } contributors={ contributors }/>
      <span>{ dateline }</span>
    </div>
  );
};

export default injectSheet(styles)(ArticleHeader);