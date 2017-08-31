import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import injectSheet from "react-jss";
import { Row, Col } from "react-bootstrap/lib";

import Byline from "../Byline";
import Dateline from "../Dateline";
import { getMedia } from "../../../media/selectors";

const styles = {
  SectionFeature: {
    borderBottom: '1px solid #ddd',
    paddingBottom: '24px',
  },
  label: {
    fontFamily: 'Minion Pro',
    fontSize: '12px',
    margin: '0 0 6px 0',
    textTransform: 'uppercase',
    width: '100%',
  },
  primaryArticle: {
    borderRight: 'solid 1px #ddd',
    padding: '2px 14px 0 0',
  },
  secondaryArticle: {
    paddingTop: '2px',
  },
  title: {
    color: '#000',
    display: 'block',
    fontFamily: 'Minion Pro',
    fontSize: '16px',
    fontWeight: 'bold',
    lineHeight: 1,
    marginBottom: '5px',
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
  focus: {
    fontFamily: 'Minion Pro',
    fontSize: '14px',
    lineHeight: 1.21,
    margin: '0 0 6px 0',
  },
  Byline: {
    fontFamily: 'Circular Std',
    fontSize: '13px',
    '& p': {
      display: 'inline',
      margin: '0 0 2px 0',
      '& a': {
        color: '#000',
        '&:hover': {
          color: '#000'
        },
      },
    },
  },
  Dateline: {
    display: 'inline',
    fontFamily: 'Circular Std',
    fontSize: '13px',
    '& p': {
      color: '#000',
      display: 'inline',
      margin: 0,
    },
  },
  figure: {
    '& img': {
      width: '100%',
    }
  },
};

const SectionFeature = ({ classes, articles, section, media }) => {
  const primaryArticle = articles[ 0 ];
  const secondaryArticle = articles[ 1 ];
  const featuredMedia = Object.values(media).find(mediaObject => {
    return mediaObject.isFeatured && mediaObject.articleId === secondaryArticle.id;
  });

  // NESTED IN <Col lg={9}>
  return (
    <Row className={ classes.SectionFeature }>
      <p className={ classes.label }>{ section.name }</p>
      <Col lg={ 4 } md={ 4 } className={ classes.primaryArticle }>
        <Link className={ classes.title }
              to={ `${ section.permalink }/${ primaryArticle.slug}` }>
          { primaryArticle.title }
        </Link>
        <p className={ classes.focus }>StuyHacks held its fourth hackathon,
          StuyHacks IV, on Saturday, May 27, and Sunday, May 28. The event
          provided an opportunity for 175 high schools.</p>
        <Byline classes={ classes } contributors={ primaryArticle.contributors }/>
        <Dateline classes={ classes } article={ primaryArticle }/>
      </Col>
      <Col lg={ 4 } md={ 4 } className={ classes.secondaryArticle }>
        <Link className={ classes.title }
              to={ `${ section.permalink }/${ secondaryArticle.slug}` }>
          { secondaryArticle.title }
        </Link>
        <p className={ classes.focus }>StuyHacks held its fourth hackathon,
          StuyHacks IV, on Saturday, May 27, and Sunday, May 28. The event
          provided an opportunity for 175 high schools.</p>
        <Byline classes={ classes } contributors={ secondaryArticle.contributors }/>
        <Dateline classes={ classes } article={ secondaryArticle }/>
      </Col>
      <Col lg={ 4 } md={ 4 } className={ classes.featuredMediaContainer }>
        <figure className={ classes.figure }>
          <img src={ featuredMedia.url }/>
        </figure>
      </Col>
    </Row>
  );
};

const mapStateToProps = state => ({
  media: getMedia(state),
});

export default connect(
  mapStateToProps
)(injectSheet(styles)(SectionFeature));