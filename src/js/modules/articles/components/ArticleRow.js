import React from "react";
import { Row, Col } from "react-bootstrap/lib";
import { Link } from "react-router-dom";
import injectSheet from "react-jss";

const styles = {
  ArticleRow: {
    borderBottom: '1px solid #ddd',
    listStyleType: 'none',
    margin: 0,
    padding: '14px 0',
    '& div:first-child': {
      paddingLeft: 0,
    },
    '& div:last-child': {
      paddingRight: 0,
    }
  },
  featuredImg: {
    width: '100%',
  },
  articleTitle: {
    display: 'block',
    fontFamily: 'MinionPro',
    fontSize: '26px',
    color: '#000',
    marginBottom: '5px',
    padding: 0,
  },
  articlePreview: {
    color: '#000',
    fontFamily: 'MinionPro',
    fontSize: '16px',
    lineHeight: '1.13',
    marginBottom: '8px'
  },
  byline: {
    display: 'inline',
    fontFamily: 'Circular Std',
    fontSize: '12px',
    fontWeight: 'bold',
    color: '#000',
    textTransform: 'uppercase',
    marginRight: '6px',
    '&: hover': {
      color: '#000',
    },
    '& div': { // each div child carries a <Link> to a contributor
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
    fontFamily: 'Circular Std',
    fontSize: '12px',
    fontWeight: 'bold',
    color: '#666',
  }
};

const ArticleRow = ({ classes, article, featuredMedia, section }) => {
  return (
    <Row key={`articleBlock${article.id}`} className={classes.ArticleRow}>
      <Col md={3} lg={3}>
        <figure>
          <img src={featuredMedia.url} className={classes.featuredImg}/>
        </figure>
      </Col>
      <Col md={6} lg={6}>
        <Link to={`${section.permalink}/${article.slug}`}
              className={classes.articleTitle}>
          {article.title}
        </Link>
        <p className={classes.articlePreview}>An angery PR comment for Cathy Cai from a week ago: Your code breaks
          when I run gulp. Also, in SectionPage, you've imported SectionArticleList but you don't use it as a component.
          The error appears to be on line 41.</p>
        <div>
          <div className={classes.byline}>{article.byline}</div>
          <span className={classes.dateline}>July 29, 2017</span>
        </div>
      </Col>
    </Row>
  );
};

export default injectSheet(styles)(ArticleRow);