import React from 'react';
import { Link } from 'react-router-dom';
import injectSheet from 'react-jss';
import Row from 'react-bootstrap/lib/Row';
import Col from 'react-bootstrap/lib/Col';

import Byline from '../Byline';
import Dateline from '../Dateline';

const styles = {
  section: {
    color: '#000',
    display: 'block',
    fontFamily: 'Minion Pro',
    fontWeight: 300,
    fontSize: '12px',
    marginBottom: '4px',
    textTransform: 'uppercase',
    '&:hover': {
      color: '#000',
    },
    '&:active': {
      color: '#000',
    },
    '&:focus': {
      color: '#000',
    },
  },
  header: {
    padding: '0 !important',
  },
  title: {
    color: '#000',
    display: 'block',
    fontFamily: 'Minion Pro',
    fontSize: '26px',
    fontWeight: 700,
    lineHeight: 1.08,
    marginBottom: '9px',
    '&:hover': {
      color: '#000',
    },
    '&:active': {
      color: '#000',
    },
    '&:focus': {
      color: '#000',
    },
  },
  preview: {
    fontFamily: 'Minion Pro',
    fontSize: '16px',
    lineHeight: 1.29,
  },
  featuredMedia: {
    maxHeight: '360px',
    overflow: 'hidden',
    padding: '0 14px !important',
    '& > a > figure > img': {
      width: '100%',
    },
  },
  '@media (min-width: 992px and max-width: )': {
    featuredMedia: {
      paddingLeft: '14px',
    },
  },
  '@media (max-width: 991px)': {
    featuredMedia: {
      paddingRight: '0 !important',
    },
  },
  '@media (max-width: 767px)': {
    featuredMedia: {
      height: 'auto',
      marginBottom: '18px',
      paddingLeft: '0 !important',
      paddingTop: '14px',
      '& figure img': {
        marginLeft: '-14px',
        width: '100vw !important',
      },
    },
  },
};

function LeftTitleArticle({ classes, article }) {
  const { section } = article;
  return (
    <Row className={classes.article}>
      <Link className={classes.section} to={section.permalink}>
        {section.name}
      </Link>
      <Col
        xs={12}
        smPush={4}
        sm={8}
        mdPush={4}
        md={8}
        lgPush={4}
        lg={8}
        className={classes.featuredMedia}
      >
        {article.media.length > 0 && (
          <Link to={`${section.permalink}/${article.slug}`}>
            <figure>
              <img
                src={article.media[0].attachment_url}
                alt={article.media[0].title}
              />
            </figure>
          </Link>
        )}
      </Col>
      <Col
        xs={12}
        smPull={8}
        sm={4}
        mdPull={8}
        md={4}
        lgPull={8}
        lg={4}
        className={classes.header}
      >
        <Link
          className={classes.title}
          to={`${section.permalink}/${article.slug}`}
        >
          {article.title}
        </Link>
        <p className={classes.preview}>{article.preview}</p>
        <Byline contributors={article.contributors} />
        <Dateline timestamp={article.created_at} />
      </Col>
    </Row>
  );
}

export default injectSheet(styles)(LeftTitleArticle);
