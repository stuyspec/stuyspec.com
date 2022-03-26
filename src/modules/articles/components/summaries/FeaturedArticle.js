/* The FeaturedArticle component displays the highest-rated article. It is
 * currently nested in a <Col md={9} lg={9}>.
 */
import React from 'react';
import { Link } from 'react-router-dom';
import injectSheet from 'react-jss';
import Row from 'react-bootstrap/lib/Row';
import Col from 'react-bootstrap/lib/Col';

import Byline from '../Byline';
import Dateline from '../Dateline';

const styles = {
  FeaturedArticle: {
    paddingBottom: '24px',
  },
  title: {
    color: '#000',
    fontFamily: 'Canela',
    fontSize: '30px',
    fontWeight: 300,
    lineHeight: '1.25',
    '&:active': {
      color: '#000',
    },
    '&:focus': {
      color: '#000',
    },
    '&:hover': {
      color: '#000',
    },
  },
  sectionLabel: {
    color: '#000',
    display: 'blocK',
    fontFamily: 'Circular Std',
    fontSize: '13px',
    fontWeight: 300,
    margin: '6px 0 9px 0',
    textTransform: 'uppercase',
    '&:hover, &:active, &:focus': {
      color: '#000',
      textDecoration: 'none',
    },
  },
  headline: {
    paddingRight: '0 !important',
    paddingLeft: '0 !important',
  },
  preview: {
    fontFamily: 'Minion Pro',
    fontSize: '1.2em',
    lineHeight: 1.29,
    margin: '0 0 8px 0',
  },
  featuredMediaContainer: {
    padding: '0 0 0 14px !important',
  },
  figure: {
    maxHeight: '480px',
    overflow: 'hidden',
    '& img': {
      width: '100%',
    },
  },
  '@media (max-width: 767px)': {
    featuredMediaContainer: {
      marginBottom: '14px',
      padding: '0 !important',
    },
    headline: {
      padding: '0 !important',
    },
    figure: {
      overflow: 'hidden',
      height: 'auto !important',
      maxHeight: 'none',
      '& img': {
        marginLeft: '-14px',
        width: '100vw',
      },
    },
  },
};

function FeaturedArticle({ classes, article }) {
  const { section } = article;
  const featuredMedia = article.media[0];
  return (
    <Row className={classes.FeaturedArticle}>
      <Col
        xs={12}
        sm={8}
        md={8}
        lg={8}
        smPush={4}
        mdPush={4}
        lgPush={4}
        className={classes.featuredMediaContainer}
      >
        {featuredMedia && (
          <Link to={`${section.permalink}/${article.slug}`}>
            <figure className={classes.figure}>
              <img
                src={featuredMedia.attachment_url}
                alt={featuredMedia.title}
              />
            </figure>
          </Link>
        )}
      </Col>
      <Col
        xs={12}
        sm={4}
        md={4}
        lg={4}
        smPull={8}
        mdPull={8}
        lgPull={8}
        className={classes.headline}
      >
        <Link
          className={classes.title}
          to={`${section.permalink}/${article.slug}`}
        >
          {article.title}
        </Link>
        <Link to={section.permalink} className={classes.sectionLabel}>
          {section.name}
        </Link>
        <p className={classes.preview}>{article.preview}</p>
        <Byline contributors={article.contributors} />
        <Dateline timestamp={article.created_at} />
      </Col>
    </Row>
  );
}

export default injectSheet(styles)(FeaturedArticle);
