import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import injectSheet from "react-jss";
import Col from "react-bootstrap/lib/col";

import Byline from "../Byline";
import Dateline from "../Dateline";
import { getMedia } from "../../../media/selectors";
import { getSections } from "../../../sections/selectors";
import { getUsers } from "../../../users/selectors";

const styles = {
  primaryArticle: {
    borderRight: 'solid 1px #ddd',
    paddingRight: '14px',
  },
  title: {
    color: '#000',
    fontFamily: 'Minion Pro',
    fontSize: '30px',
    fontWeight: 'bold',
    marginBottom: '7px',
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
  figure: {
    '& img': {
      width: '100%',
    }
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
};

const SectionFeature = ({ classes, articles, section }) => {
  const featuredMedia = Object.values(media).find(mediaObject => {
    return mediaObject.isFeatured && mediaObject.articleId === article.id;
  });
  const primaryArticle = articles[ 0 ];
  const secondaryArticle = articles[ 1 ];
  return (
    <div className={ classes.SectionFeature }>
      <Col lg={ 3 } md={ 3 } className={ classes.primaryArticle }>
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
      <Col lg={ 6 } md={ 6 } className={ classes.featuredMediaContainer }>
        <figure className={ classes.figure }>
          <img src={ featuredMedia.url }/>
        </figure>
      </Col>
    </div>
  );
};

const mapStateToProps = state => ({
  media: getMedia(state),
  sections: getSections(state),
  users: getUsers(state),
});

export default connect(
  mapStateToProps
)(injectSheet(styles)(SectionFeature));