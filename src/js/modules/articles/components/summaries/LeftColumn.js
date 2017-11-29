import React from "react";
import { connect } from "react-redux";
import injectSheet from "react-jss";
import { Col } from "react-bootstrap/lib";
import { Link } from "react-router-dom";

import { getArticlesWithContributors } from "../../selectors";
import Byline from "../Byline";
import Dateline from "../Dateline";
import Outquote from "../Outquote";

// TODO: ADD THE OUTQUOTE

const styles = {
  LeftColumn: {
    paddingRight: "7px !important", // adds to the 7px in Col = 14px
    "& > div": {
      borderBottom: "1px solid #ddd",
      marginBottom: "14px",
      paddingBottom: "14px !important",
    },
  },
  figure: {
    margin: "0 0 13px 0",
    width: "100%",
    "& img": {
      width: "100%",
    },
  },
  primaryArticle: {
    borderBottom: "1px solid #ddd",
  },
  primaryTitle: {
    color: "#000",
    display: "block",
    fontFamily: "Minion Pro",
    fontWeight: "bold",
    fontSize: "30px",
    lineHeight: 1.13,
    marginBottom: "6px",
    "&:hover, &:active, &:focus": {
      color: "#000",
    },
  },
  sectionLabel: {
    color: "#000",
    display: "block",
    fontFamily: "Circular Std",
    fontWeight: 300,
    fontSize: "12px",
    marginBottom: "7px",
    textTransform: "uppercase",
    "&:hover, &:active, &:focus": {
      color: "#000",
    },
  },
  summary: {
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
    fontSize: "18px",
    lineHeight: 1.22,
    marginBottom: "4px",
    "&:hover, &:active, &:focus": {
      color: "#000",
    },
  },
  bylineContainer: {
    marginBottom: "4px",
  },
  "@media (max-width: 768px)": {
    LeftColumn: {
      paddingRight: "0 !important",
    },
    figure: {
      "& img": {
        marginLeft: "-14px",
        width: "100vw",
      },
    },
    primaryTitle: {
      fontSize: "28px",
      fontWeight: "bold",
      fontStyle: "normal",
      lineHeight: "30px",
    },
    articleTitle: {
      fontSize: "28px",
      fontWeight: "bold",
      fontStyle: "normal",
      lineHeight: "30px",
    },
  },
};

const LeftColumn = ({ classes, articles, media, sections, outquotes }) => {
  const [primaryArticle, secondaryArticle] = Object.values(articles).slice(
    6,
    8,
  );
  const outquoteArticle = Object.values(articles)
    .slice(9)
    .find(article => {
      return Object.values(outquotes).find(
        outquote => outquote.articleId === article.id,
      );
    });

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
    <Col xs={12} sm={3} md={3} lg={3} className={classes.LeftColumn}>
      <div className={classes.primaryArticle}>
        {primaryMedia && (
          <div>
            <Link
              to={`${sections[primaryArticle.sectionId]
                .permalink}/${primaryArticle.slug}`}
            >
              <figure className={classes.figure}>
                <img src={primaryMedia.mediumAttachmentUrl} />
              </figure>
            </Link>
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
          {sections[primaryArticle.sectionId].name}
        </Link>
        <p className={classes.summary}>{primaryArticle.summary}</p>
        <Byline contributors={primaryArticle.contributors} />
        <Dateline article={primaryArticle} />
      </div>

      <div className={classes.secondaryArticle}>
        {secondaryMedia && (
          <div>
            <Link
              to={`${sections[secondaryArticle.sectionId]
                .permalink}/${secondaryArticle.slug}`}
            >
              <figure className={classes.figure}>
                <img src={secondaryMedia.mediumAttachmentUrl} />
              </figure>
            </Link>
          </div>
        )}
        <Link
          to={sections[secondaryArticle.sectionId].permalink}
          className={classes.sectionLabel}
        >
          {sections[secondaryArticle.sectionId].name}
        </Link>
        <Link
          to={`${sections[secondaryArticle.sectionId]
            .permalink}/${secondaryArticle.slug}`}
          className={classes.articleTitle}
        >
          {secondaryArticle.title}
        </Link>
        <p className={classes.summary}>{secondaryArticle.summary}</p>
        <div className={classes.bylineContainer}>
          <Byline contributors={secondaryArticle.contributors} />
        </div>
        <Dateline article={secondaryArticle} />
      </div>

      <div className={classes.outquoteArticle}>
        {outquoteMedia && (
          <div>
            <Link
              to={`${sections[outquoteArticle.sectionId]
                .permalink}/${outquoteArticle.slug}`}
            >
              <figure className={classes.figure}>
                <img src={outquoteMedia.mediumAttachmentUrl} />
              </figure>
            </Link>
          </div>
        )}
        <Link
          to={sections[outquoteArticle.sectionId].permalink}
          className={classes.sectionLabel}
        >
          {sections[outquoteArticle.sectionId].name}
        </Link>
        <Link
          to={`${sections[outquoteArticle.sectionId]
            .permalink}/${outquoteArticle.slug}`}
          className={classes.articleTitle}
        >
          {outquoteArticle.title}
        </Link>
        {/*<Outquote quote={outquoteArticle.outquotes[0]} />*/}
        <p className={classes.summary}>{outquoteArticle.summary}</p>
        <div className={classes.bylineContainer}>
          <Byline contributors={outquoteArticle.contributors} />
        </div>
        <Dateline article={outquoteArticle} />
      </div>
    </Col>
  );
};

const mapStateToProps = state => ({
  articles: getArticlesWithContributors(state),
  media: state.media.media,
  sections: state.sections.sections,
  outquotes: state.outquotes.outquotes,
});

export default connect(mapStateToProps)(injectSheet(styles)(LeftColumn));
