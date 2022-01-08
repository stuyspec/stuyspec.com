import React from 'react';
import Col from 'react-bootstrap/lib/Col';
import injectSheet from 'react-jss';
import { Link } from 'react-router-dom';
import { Byline, Dateline } from '..';

const styles = {
  ArticleRecommendation: {
    marginBottom: '12px',
  },
  figure: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    height: '400px',
    marginBottom: '16px',
    overflow: 'hidden',
    width: '100%',
    '& img': {
      height: '400px',
      objectFit: 'cover',
      width: '100%',
    },
  },
  sectionLabel: {
    color: '#000',
    display: 'block',
    fontFamily: 'Circular Std',
    fontSize: '12px',
    fontWeight: 300,
    marginBottom: '12px',
    textTransform: 'uppercase',
    '&:hover, &:active, &:focus': {
      color: '#000',
    },
  },
  title: {
    color: '#000',
    display: 'block',
    fontFamily: 'Canela',
    fontSize: '28px',
    fontWeight: 300,
    lineHeight: '1.2',
    marginBottom: '8px',
    '&:hover, &:active, &:focus': {
      color: '#000',
    },
  },
  preview: {
    color: '#000',
    fontFamily: 'Minion Pro',
    fontSize: '16px',
    fontWeight: 300,
    lineHeight: '1.29',
  },
};

function ArticleRecommendation({ classes, article }) {
  const { section } = article;
  return (
    <Col xs={12} sm={6} md={6} lg={6} className={classes.ArticleRecommendation}>
      {article.media && article.media.length > 0 && (
        <div>
          <Link to={`${section.permalink}/${article.slug}`}>
            <figure className={classes.figure}>
              <img
                src={article.media[0].attachment_url}
                alt={article.media[0].title}
              />
            </figure>
          </Link>
        </div>
      )}
      <Link to={section.permalink} className={classes.sectionLabel}>
        {section.name}
      </Link>
      <Link
        to={`${section.permalink}/${article.slug}`}
        className={classes.title}
      >
        {article.title}
      </Link>
      <p className={classes.preview}>{article.preview}</p>
      <Byline contributors={article.contributors} />
      <Dateline timestamp={article.created_at} />
    </Col>
  );
}

export default injectSheet(styles)(ArticleRecommendation);
