import React from "react";
import { graphql } from "react-apollo";
import gql from "graphql-tag";
import humps from "humps";
import { Link } from "react-router-dom";
import injectSheet from "react-jss";
import { Row, Col } from "react-bootstrap/lib";

import Byline from "../../articles/components/Byline";
import Dateline from "../../articles/components/Dateline";

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
    "&:hover, &:active, &:focus": {
      color: "#000",
      textDecoration: "none",
    },
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
    "&:hover, &:active, &:focus": {
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
    maxHeight: "240px",
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
    padding: "12px 7px 8px 0",
    "& a": {
      fontSize: "22px",
      marginBottom: 0,
    },
  },
  mobileArticleTitle2: {
    borderTop: "1px solid #ddd !important",
    padding: "12px 7px 2px 0",
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

const SectionFeature = ({ classes, articles }) => {
  const [primaryArticle, secondaryArticle, ternaryArticle] = articles;
  const featuredMedia = primaryArticle.media[0];
  const { section } = primaryArticle;
  return (
    <Row className={classes.SectionFeature}>
      <Link to={section.permalink} className={classes.sectionLabel}>
        {section.name}
      </Link>

      <Col xsHidden sm={4} md={4} lg={4} className={classes.secondaryArticle}>
        <Link
          className={classes.title}
          to={`${section.permalink}/${secondaryArticle.slug}`}
        >
          {secondaryArticle.title}
        </Link>
        <p className={classes.summary}>{secondaryArticle.summary}</p>
        <Byline contributors={secondaryArticle.contributors} />
        <Dateline timestamp={secondaryArticle.createdAt} />
      </Col>
      {featuredMedia ? (
        <Col
          xs={6}
          sm={4}
          md={4}
          lg={4}
          className={classes.featuredMediaContainer}
        >
          <Link to={`${section.permalink}/${primaryArticle.slug}`}>
            <figure className={classes.figure}>
              <img src={featuredMedia.mediumAttachmentUrl} />
            </figure>
          </Link>
        </Col>
      ) : (
        <Col xsHidden sm={4} md={4} lg={4} className={classes.ternaryArticle}>
          <Link
            className={classes.title}
            to={`${section.permalink}/${ternaryArticle.slug}`}
          >
            {ternaryArticle.title}
          </Link>
          <p className={classes.summary}>{ternaryArticle.summary}</p>
          <Byline contributors={ternaryArticle.contributors} />
          <Dateline timestamp={ternaryArticle.createdAt} />
        </Col>
      )}
      <Col xs={6} sm={4} md={4} lg={4} className={classes.primaryArticle}>
        <Link
          className={classes.title}
          to={`${section.permalink}/${primaryArticle.slug}`}
        >
          {primaryArticle.title}
        </Link>
        <p className={classes.summary}>{primaryArticle.summary}</p>
        <Byline contributors={primaryArticle.contributors} />
        <Dateline timestamp={primaryArticle.createdAt} />
      </Col>

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
      <Col
        xs={12}
        smHidden
        mdHidden
        lgHidden
        className={classes.mobileArticleTitle2}
      >
        <Link
          className={classes.title}
          to={`${section.permalink}/${ternaryArticle.slug}`}
        >
          {ternaryArticle.title}
        </Link>
      </Col>
    </Row>
  );
};

export default injectSheet(styles)(SectionFeature);
