import React from "react";
import { connect } from "react-redux";
import { Row, Col } from "react-bootstrap/lib";
import { Link } from "react-router-dom";
import injectSheet from "react-jss";

import { getMedia } from "../../media/selectors";
import { getSections } from "../../sections/selectors";
import Byline from "./Byline";

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
    '&:hover': {
      color: '#000',
    }
  },
  articlePreview: {
    color: '#000',
    fontFamily: 'MinionPro',
    fontSize: '16px',
    lineHeight: '1.13',
    marginBottom: '8px'
  },
  Byline: {
    display: 'inline',
    fontFamily: 'Circular Std',
    fontSize: '12px',
    fontWeight: 'bold',
    textTransform: 'uppercase',
    marginRight: '6px',
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
    fontFamily: 'Circular Std',
    fontSize: '12px',
    fontWeight: 'bold',
    color: '#666',
  }
};

const ArticleRow = ({ classes, article, sections, media }) => {
  const matchedSections = Object.filter(sections, sectionObject => {
    return article.sectionSlug === sectionObject.slug;
  });
  const section = Object.values(matchedSections)[ 0 ];
  const matchedMedia = Object.filter(media, mediaObject => {
    return mediaObject.isFeatured && mediaObject.articleId === article.id;
  });
  const featuredMedia = Object.values(matchedMedia)[ 0 ];
  return (
    <Row key={ `articleBlock${article.id}` } className={ classes.ArticleRow }>
      <Col md={ 3 } lg={ 3 }>
        <figure>
          <img src={ featuredMedia.url } className={ classes.featuredImg }/>
        </figure>
      </Col>
      <Col md={ 6 } lg={ 6 }>
        <Link to={ `${section.permalink}/${article.slug}` }
              className={ classes.articleTitle }>
          { article.title }
        </Link>
        <p className={ classes.articlePreview }>
          Fake comment: in SectionPage, you've imported SectionArticleList but you
          don't use it as a component. The error appears to be on line 41.
        </p>
        <div>
          <Byline classes={ classes } contributors={ article.contributors }/>
          <span className={ classes.dateline }>{ article.dateline }</span>
        </div>
      </Col>
    </Row>
  );
};

const mapStateToProps = (state) => ({
  media: getMedia(state),
  sections: getSections(state),
});

export default connect(
  mapStateToProps
)(injectSheet(styles)(ArticleRow));