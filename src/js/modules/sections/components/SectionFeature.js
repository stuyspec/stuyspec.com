import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import injectSheet from "react-jss";
import { Row, Col } from "react-bootstrap/lib";

import Byline from "../../articles/components/Byline";
import Dateline from "../../articles/components/Dateline";
import { getArticlesWithContributors } from "../../articles/selectors";

const styles = {
  SectionFeature: {
    borderTop: "1px solid #ddd",
    paddingTop: "6px",
    paddingBottom: "18px",
  },
  sectionLabel: {
    color: "#000",
    display: "block",
    fontFamily: "Minion Pro",
    fontSize: "12px",
    marginBottom: "3px",
    textTransform: "uppercase",
    width: "100%",
    "&:hover": { color: "#000", textDecoration: "none" },
    "&:focus": { color: "#000", textDecoration: "none" },
  },
  primaryArticle: {
    paddingLeft: "13px !important",
    paddingRight: "0 !important",
  },
  secondaryArticle: {
    paddingRight: "7px",
  },
  ternaryArticle: {
    padding: "0 14px 0 13px !important",
    borderRight: "solid 1px #ddd",
    paddingRight: "13px !important",
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
  summary: {
    fontFamily: "Minion Pro",
    fontSize: "14px",
    lineHeight: 1.29,
    margin: "0 0 12px 0",
  },
  figure: {
    height: "240px",
    overflow: "hidden",
    "& img": {
      width: "100%",
    },
  },
  featuredMediaContainer: {
    borderRight: "solid 1px #ddd",
    paddingLeft: "13px !important",
    paddingRight: "14px !important",
  },
  mobileArticleTitle1: {
    borderTop: "1px solid #ddd !important",
    marginTop: "14px",
    padding: "12px 7px 8px 7px",
    "& a": {
      fontSize: "22px",
      marginBottom: 0,
    },
  },
  mobileArticleTitle2: {
    borderTop: "1px solid #ddd !important",
    padding: "12px 7px 2px 7px",
    "& a": {
      fontSize: "22px",
      marginBottom: 0,
    },
  },
  "@media (max-width: 767px)": {
    SectionFeature: {
      borderBottom: "1px solid #ddd",
      paddingBottom: "6px",
    },
    secondaryArticle: {
      padding: "0px !important",
      marginBottom: 0,
    },
    ternaryArticle: {
      padding: "0px !important",
      marginBottom: 0,
    },
    featuredMediaContainer: {
      borderRight: 0,
      paddingRight: "0 !important",
    },
  },
};

const SectionFeature = ({
  classes,
  articles,
  section,
  sections,
  media,
  without
}) => {
  let sectionArticles = [];
  sectionArticles = Object.values(
    Object.filter(articles, article => article.sectionId === section.id && article !== without),
  )
  const primaryArticle =
    sectionArticles[0] === Object.values(articles)[0]
      ? sectionArticles[1]
      : sectionArticles[0];
  let featuredMedia = null;
  const secondaryArticle =
    sectionArticles.slice(1, 10).find(article => {
      if (article === primaryArticle) {
        return false;
      }
      // find a TOP 10 Article within the section with media
      const mediaObject = Object.values(media).find(
        mediaObject => mediaObject.articleId === article.id,
      );
      if (mediaObject) {
        featuredMedia = mediaObject;
      }
      return mediaObject;
    }) || sectionArticles[2]; // if none such article found, default is the second
  const possibleTernaryArticle = sectionArticles
    .slice(1, 10)
    .find(
      article => article !== secondaryArticle && article !== primaryArticle,
    );
  // NESTED IN <Col lg={9}>
  return (
    <Row className={classes.SectionFeature}>
      <Link to={section.permalink} className={classes.sectionLabel}>
        {section.name}
      </Link>
      {secondaryArticle && (
        <Col xs={6} sm={4} md={4} lg={4} className={classes.secondaryArticle}>
          <Link
            className={classes.title}
            to={`${section.permalink}/${secondaryArticle.slug}`}
          >
            {secondaryArticle.title}
          </Link>
          <p className={classes.summary}>{secondaryArticle.summary}</p>
          <Byline contributors={secondaryArticle.contributors} />
          <Dateline article={secondaryArticle} />
        </Col>
      )}
      {featuredMedia ? (
        <Col
          xs={6}
          sm={4}
          md={4}
          lg={4}
          className={classes.featuredMediaContainer}
        >
          <figure className={classes.figure}>
            <img src={featuredMedia.mediumAttachmentUrl} />
          </figure>
        </Col>
      ) : (
        possibleTernaryArticle && (
          <Col xsHidden sm={4} md={4} lg={4} className={classes.ternaryArticle}>
            <Link
              className={classes.title}
              to={`${section.permalink}/${possibleTernaryArticle.slug}`}
            >
              {possibleTernaryArticle.title}
            </Link>
            <p className={classes.summary}>{possibleTernaryArticle.summary}</p>
            <Byline contributors={possibleTernaryArticle.contributors} />
            <Dateline article={possibleTernaryArticle} />
          </Col>
        )
      )}
      {primaryArticle && (
        <Col xsHidden sm={4} md={4} lg={4} className={classes.primaryArticle}>
          <Link
            className={classes.title}
            to={`${section.permalink}/${primaryArticle.slug}`}
          >
            {primaryArticle.title}
          </Link>
          <p className={classes.summary}>{primaryArticle.summary}</p>
          <Byline contributors={primaryArticle.contributors} />
          <Dateline article={primaryArticle} />
        </Col>
      )}
      {primaryArticle && (
        <Col
          xs={12}
          smHidden
          mdHidden
          lgHidden
          className={classes.mobileArticleTitle1}
        >
          <Link
            className={classes.title}
            to={`${section.permalink}/${primaryArticle.slug}`}
          >
            {primaryArticle.title}
          </Link>
        </Col>
      )}
      {possibleTernaryArticle && (
        <Col
          xs={12}
          smHidden
          mdHidden
          lgHidden
          className={classes.mobileArticleTitle2}
        >
          <Link
            className={classes.title}
            to={`${section.permalink}/${possibleTernaryArticle.slug}`}
          >
            {possibleTernaryArticle.title}
          </Link>
        </Col>
      )}
    </Row>
  );
};

const mapStateToProps = (state, ownProps) => ({
  articles: getArticlesWithContributors(state),
  media: state.media.media,
  sections: state.sections.sections,
});

export default connect(mapStateToProps)(injectSheet(styles)(SectionFeature));
