import React from "react";
import { connect } from "react-redux";
import injectSheet from "react-jss";
import { Col } from "react-bootstrap/lib";
import { Link } from "react-router-dom";

import { getArticlesWithContributors } from "../../selectors";
import Byline from "../Byline";
import Dateline from "../Dateline";
import Outquote from "../Outquote";

const styles = {
  RightColumn: {},
  figure: {
    margin: "0 0 12px 0",
    width: "100%",
    "& img": {
      width: "100%",
    },
  },
  primaryArticle: {
    borderBottom: "1px solid #ddd",
    marginBottom: "14px",
    paddingBottom: "14px",
  },
  primaryTitle: {
    color: "#000",
    display: "block",
    fontFamily: "Minion Pro",
    fontWeight: "bold",
    fontSize: "30px",
    fontStyle: "italic",
    lineHeight: 1.13,
    marginBottom: "12px",
    "&:hover": {
      color: "#000",
    },
    "&:focus": {
      color: "#000",
    },
  },
  sectionLabel: {
    color: "#000",
    display: "block",
    fontFamily: "Circular Std",
    fontWeight: 300,
    fontSize: "12px",
    marginBottom: "4px",
    "&:hover": {
      color: "#000",
    },
    "&:focus": {
      color: "#000",
    },
  },
  articleSummary: {
    color: "#000",
    fontFamily: "Minion Pro",
    fontSize: "14px",
    lineHeight: 1.29,
    marginBottom: "10px",
  },
  articleTitle: {
    color: "#000",
    display: "block",
    fontFamily: "Minion Pro",
    fontWeight: "bold",
    fontSize: "12px",
    lineHeight: 1.22,
    marginBottom: "4px",
    "&:hover": {
      color: "#000",
    },
    "&:focus": {
      color: "#000",
    },
  },
};

const RightColumn = ({ classes, articles, media, sections }) => {
  const [primaryArticle, secondaryArticle, outquoteArticle] = Object.values(
    articles,
  ).slice(0, 3);
  [primaryMedia, secondaryMedia, outquoteMedia] = [
    primaryArticle,
    secondaryArticle,
    outquoteArticle,
  ].map(article => {
    return Object.values(media).find(
      mediaObject =>
        mediaObject.articleId === article.id && mediaObject.isFeatured,
    );
  });
  return (
    <Col md={3} lg={3} className={classes.RightColumn}>
      <div className={classes.primaryArticle}>
        {primaryMedia && (
          <div>
            <figure className={classes.figure}>
              <img src={primaryMedia.url} />
            </figure>
          </div>
        )}
        <Link
          to={`${sections[primaryArticle.sectionId]
            .permalink}/${primaryArticle.slug}`}
          className={classes.primaryTitle}
        >
          {primaryArticle.title}
        </Link>
        <Link
          to={sections[primaryArticle.sectionId].permalink}
          className={classes.sectionLabel}
        >
          {sections[primaryArticle.sectionId].title}
        </Link>
        <p className={classes.articleSummary}>
          StuyHacks held its fourth hackathon, StuyHacks IV, on Saturday, May
          27, and Sunday, May 28. The event provided an opportunity for 175 high
          schools.
        </p>
        <Byline contributors={primaryArticle.contributors} />
        <Dateline article={primaryArticle} />
      </div>

      <div className={classes.secondaryArticle}>
        {secondaryMedia && (
          <div>
            <figure className={classes.figure}>
              <img src={secondaryMedia.url} />
            </figure>
          </div>
        )}
        <Link
          to={sections[secondaryArticle.sectionId].permalink}
          className={classes.sectionLabel}
        >
          {sections[secondaryArticle.sectionId].title}
        </Link>
        <Link
          to={`${sections[secondaryArticle.sectionId]
            .permalink}/${secondaryArticle.slug}`}
          className={classes.articleTitle}
        >
          {secondaryArticle.title}
        </Link>
        <Byline contributors={secondaryArticle.contributors} />
        <p className={classes.articleSummary}>
          StuyHacks held its fourth hackathon, StuyHacks IV, on Saturday, May
          27, and Sunday, May 28. The event provided an opportunity for 175 high
          schools.
        </p>
        <Dateline article={secondaryArticle} />
      </div>

      <div className={classes.outquoteArticle}>
        {outquoteMedia && (
          <div>
            <figure className={classes.figure}>
              <img src={outquoteMedia.url} />
            </figure>
          </div>
        )}
        <Outquote quote={outquoteArticle.outquotes[0]} />
        <Link
          to={sections[outquoteArticle.sectionId].permalink}
          className={classes.sectionLabel}
        >
          {sections[outquoteArticle.sectionId].title}
        </Link>
        <Link
          to={`${sections[outquoteArticle.sectionId]
            .permalink}/${outquoteArticle.slug}`}
          className={classes.articleTitle}
        >
          {outquoteArticle.title}
        </Link>
        <p className={classes.articleSummary}>
          StuyHacks held its fourth hackathon, StuyHacks IV, on Saturday, May
          27, and Sunday, May 28. The event provided an opportunity for 175 high
          schools.
        </p>
        <Byline contributors={outquoteArticle.contributors} />
        <Dateline article={outquoteArticle} />
      </div>
    </Col>
  );
};

const mapStateToProps = state => ({
  articles: getArticlesWithContributors(state),
  media: state.media.media,
  sections: state.sections.sections,
});

export default connect(mapStateToProps)(injectSheet(styles)(RightColumn));
