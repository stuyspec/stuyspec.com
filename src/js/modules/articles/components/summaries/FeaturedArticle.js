/* The FeaturedArticle component displays the highest-rated article. It is
 * currently nested in a <Col md={9} lg={9}>.
 */

import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import injectSheet from "react-jss";
import { Row, Col } from "react-bootstrap/lib";

import Byline from "../Byline";
import Dateline from "../Dateline";
import { getArticlesWithContributors } from "../../selectors";

const styles = {
  FeaturedArticle: {
    paddingBottom: "24px",
  },
  title: {
    color: "#000",
    fontFamily: "Canela",
    fontSize: "30px",
    fontWeight: "300",
    lineHeight: "1.25",
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
  sectionLabel: {
    color: "#000",
    display: "blocK",
    fontFamily: "Circular Std",
    fontSize: "13px",
    fontWeight: 300,
    margin: "6px 0 9px 0",
    textTransform: "uppercase",
    "&:hover": { color: "#000", textDecoration: "none" },
    "&:focus": { color: "#000", textDecoration: "none" },
  },
  headline: {
    paddingRight: "0 !important",
  },
  focus: {
    fontFamily: "Minion Pro",
    fontSize: "14px",
    lineHeight: 1.29,
    margin: "0 0 14px 0",
  },
  featuredMediaContainer: {
    padding: "0 0 0 14px !important",
  },
  figure: {
    "& img": {
      width: "100%",
    },
  },
};

const FeaturedArticle = ({ classes, articles, media, sections }) => {
  const article = Object.values(articles)[0];
  const section = Object.values(sections).find(section => {
    return section.id === article.sectionId;
  });
  const featuredMedia = Object.values(media).find(mediaObject => {
    return mediaObject.isFeatured && mediaObject.articleId === article.id;
  });
  // NESTED IN <Col lg={9}>
  return (
    <Row className={classes.FeaturedArticle}>
      <Col lg={4} md={4} className={classes.headline}>
        <Link
          className={classes.title}
          to={`${section.permalink}/${article.slug}`}
        >
          {article.title}
        </Link>
        <Link to={section.permalink} className={classes.sectionLabel}>
          {section.name}
        </Link>
        <p className={classes.focus}>
          StuyHacks held its fourth hackathon, StuyHacks IV, on Saturday, May
          27, and Sunday, May 28. The event provided an opportunity for 175 high
          schools.
        </p>
        <Byline contributors={article.contributors} />
        <Dateline article={article} />
      </Col>
      <Col lg={8} md={8} className={classes.featuredMediaContainer}>
        <figure className={classes.figure}>
          <img src={featuredMedia.url} />
        </figure>
      </Col>
    </Row>
  );
};

const mapStateToProps = state => ({
  articles: getArticlesWithContributors(state),
  media: state.media.media,
  sections: state.sections.sections,
  users: state.users.users,
});

export default connect(mapStateToProps)(injectSheet(styles)(FeaturedArticle));
