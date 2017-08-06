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
    '& span:first-child': {
      fontWeight: 'bold',
      marginRight: '9px',
    },
  },
};

const ArticleHeader = ({ classes, section, headline, contributors, dateline }) => {
  const getLinkToSection = () => {
    let tempSection = section;
    let link = tempSection.slug;
    while (tempSection.parentSlug !== null) {
      link = `${tempSection.parentSlug}/${link}`
    }
    return `/${link}`;
  };
  const contributorsToString = () => {
    let byline = "By ";
    let separator = "";
    for (let c = 0, l = contributors.length; c < l; c++) {
      if (c === 1) {
        separator = ", ";
      } else if (c === l - 1) {
        separator = " & ";
      }
      byline += separator + contributors[ c ].firstName + " " + contributors[ c ].lastName;
    }
    return byline;
  };
  return (
    <div className={classes.ArticleHeader}>
      <Link to={getLinkToSection()} className={classes.rubric}>
        {section.name}
      </Link>
      <h1 className={classes.headline}>{headline}</h1>
      <p className={classes.metaInfo}>
        <span>{contributorsToString()}</span>
        <span>{dateline}</span>
      </p>
    </div>
  );
};

export default injectSheet(styles)(ArticleHeader);
