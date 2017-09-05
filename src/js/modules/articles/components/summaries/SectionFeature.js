import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import injectSheet from "react-jss";
import { Row, Col } from "react-bootstrap/lib";

import Byline from "../Byline";
import Dateline from "../Dateline";
import { getMedia } from "../../../media/selectors";
import { getSectionTreeArticles } from "../../selectors";

const styles = {
  SectionFeature: {},
  label: {
    color: "#000",
    fontFamily: "Minion Pro",
    fontSize: "12px",
    margin: "0 0 3px 7px",
    textTransform: "uppercase",
    width: "100%",
  },
  primaryArticle: {
    borderRight: "solid 1px #ddd",
    padding: "0 13px 0 7px",
    marginBottom: "19px",
  },
  secondaryArticle: {
    padding: "0 14px 0 13px",
    marginBottom: "19px",
  },
  ternaryArticle: {
    padding: '0 14px 0 13px',
    borderLeft: 'solid 1px #ddd',
    marginBottom: "19px",
  },
  title: {
    color: "#000",
    display: "block",
    fontFamily: "Minion Pro",
    fontSize: "16px",
    fontWeight: "bold",
    lineHeight: 1.25,
    marginBottom: "7px",
    "&:active": {
      color: "#000",
    },
    "&:focus": {
      color: "#000",
    },
    "&:hover": {
      color: "#000",
    },
  },
  focus: {
    fontFamily: "Minion Pro",
    fontSize: "14px",
    lineHeight: 1.29,
    margin: "0 0 12px 0",
  },
  Byline: {
    color: "#000",
    fontFamily: "Circular Std",
    fontSize: "13px",
    fontWeight: "500",
    "& p": {
      display: "inline",
      margin: "0 0 2px 0",
      "& a": {
        color: "#000",
        "&:hover": {
          color: "#000",
        },
      },
    },
  },
  Dateline: {
    color: "#000",
    display: "inline",
    fontFamily: "Circular Std",
    fontSize: "13px",
    fontWeight: "500",
    "& p": {
      color: "#000",
      display: "inline",
      margin: 0,
    },
  },
  figure: {
    "& img": {
      width: "100%",
    },
  },
  featuredMediaContainer: {
    paddingLeft: 0,
    paddingRight: "14px",
  },
  hr: {
    borderColor: "#ddd",
    margin: "0 0 6px 7px",
    width: "786px",
  },
};

const SectionFeature = ({ classes, articles, section, media, sections }) => {
  const sectionArticles = Object.values(articles);
  const primaryArticle = sectionArticles[0];
  const secondaryArticle = sectionArticles[1];
  const ternaryArticle = sectionArticles[1]; //Make it number 2 after we have real articles
  const featuredMedia = Object.values(media).find(mediaObject => {
    return (
      mediaObject.isFeatured && mediaObject.articleId === secondaryArticle.id
    );
  });

  // NESTED IN <Col lg={9}>
  return (
    <Row className={classes.SectionFeature}>
      <hr className={classes.hr} />
      <p className={classes.label}>{section.name}</p>
      <Col lg={4} md={4} className={classes.primaryArticle}>
        <Link
          className={classes.title}
          to={`${sections[primaryArticle.sectionId]
            .permalink}/${primaryArticle.slug}`}
        >
          {primaryArticle.title}
        </Link>
        <p className={classes.focus}>
          StuyHacks held its fourth hackathon, StuyHacks IV, on Saturday, May
          27, and Sunday, May 28. The event provided an opportunity for 175 high
          schools.
        </p>
        <Byline classes={classes} contributors={primaryArticle.contributors} />
        <Dateline classes={classes} article={primaryArticle} />
      </Col>
      <Col lg={4} md={4} className={classes.secondaryArticle}>
        <Link
          className={classes.title}
          to={`${sections[secondaryArticle.sectionId]
            .permalink}/${secondaryArticle.slug}`}
        >
          {secondaryArticle.title}
        </Link>
        <p className={classes.focus}>
          StuyHacks held its fourth hackathon, StuyHacks IV, on Saturday, May
          27, and Sunday, May 28. The event provided an opportunity for 175 high
          schools.
        </p>
        <Byline
          classes={classes}
          contributors={secondaryArticle.contributors}
        />
        <Dateline classes={classes} article={secondaryArticle} />
      </Col>
      {featuredMedia ? (
        <Col lg={4} md={4} className={classes.featuredMediaContainer}>
          <figure className={classes.figure}>
            <img src={featuredMedia.url} />
          </figure>
        </Col>
      ) : (
        <Col lg={4} md={4} className={classes.ternaryArticle}>
          <Link
            className={classes.title}
            to={`${sections[ternaryArticle.sectionId]
              .permalink}/${ternaryArticle.slug}`}
          >
            {ternaryArticle.title}
          </Link>
          <p className={classes.focus}>
            StuyHacks held its fourth hackathon, StuyHacks IV, on Saturday, May
            27, and Sunday, May 28. The event provided an opportunity for 175
            high schools.
          </p>
          <Byline
            classes={classes}
            contributors={ternaryArticle.contributors}
          />
          <Dateline classes={classes} article={ternaryArticle} />
        </Col>
      )}
    </Row>
  );
};

const mapStateToProps = (state, ownProps) => ({
  media: getMedia(state),
  articles: getSectionTreeArticles(state, ownProps),
});

export default connect(mapStateToProps)(injectSheet(styles)(SectionFeature));
