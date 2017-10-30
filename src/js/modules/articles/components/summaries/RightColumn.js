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
  RightColumn: {
    borderLeft: "solid 1px #ddd",
    paddingLeft: "14px !important",
    paddingRight: 0,
    "& > div": {
      borderBottom: "1px solid #ddd",
      marginBottom: "14px",
      paddingBottom: "14px !important",
    },
  },
  figure: {
    margin: "0 0 12px 0",
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
    marginBottom: "2px",
    textTransform: "uppercase",
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
    fontSize: "18px",
    lineHeight: 1.22,
    marginBottom: "1px",
    "&:hover": {
      color: "#000",
    },
    "&:focus": {
      color: "#000",
    },
  },
  label: {
    borderTop: "1px solid #000",
    borderBottom: "1px solid #ddd",
    color: "#000",
    display: "block",
    fontFamily: "Circular Std",
    fontSize: "13px",
    fontWeight: 300,
    margin: 0,
    padding: "4px 0",
    "&:hover": {
      color: "#000",
    },
    "&:focus": {
      color: "#000",
    },
  },
  "@media (max-width: 768px)": {
    RightColumn: {
      borderLeft: "none",
      paddingLeft: "0 !important",
    },
  },
};

const RightColumn = ({ classes, articles, media, sections }) => {
  const [primaryArticle, secondaryArticle] = Object.values(articles).slice(
    3,
    5,
  ); // [0, 3) taken by Left Column... we need a better system.
  /*
  [primaryMedia, secondaryMedia] = [
    primaryArticle,
    secondaryArticle,
  ].map(article => {
    return Object.values(media).find(
      mediaObject =>
        mediaObject.articleId === article.id && mediaObject.isFeatured,
    );
  });
  */
  return (
    <Col sm={3} md={3} lg={3} className={classes.RightColumn}>
      <div className={classes.primaryArticle}>
        <Link
          to={sections[primaryArticle.sectionId].permalink}
          className={classes.sectionLabel}
        >
          {sections[primaryArticle.sectionId].name}
        </Link>
        <Link
          to={`${sections[primaryArticle.sectionId]
            .permalink}/${primaryArticle.slug}`}
          className={classes.articleTitle}
        >
          {primaryArticle.title}
        </Link>
        {primaryArticle.outquotes.length > 0 && (
          <Outquote quote={primaryArticle.outquotes[0]} />
        )}
        <p className={classes.articleSummary}>{primaryArticle.summary}</p>
        <Byline contributors={primaryArticle.contributors} />
        <Dateline article={primaryArticle} />
      </div>

      <div className={classes.secondaryArticle}>
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
        <p className={classes.articleSummary}>{secondaryArticle.summary}</p>
        <Byline contributors={secondaryArticle.contributors} />
        <Dateline article={secondaryArticle} />
      </div>
      <Link to="/" className={classes.label}>
        SING! 2017 Senior Playlist
      </Link>
      <iframe
        src="https://open.spotify.com/embed/user/spec.ae/playlist/4FrJhYPbWrWF3fYkzGZPy1"
        width="300"
        height="380"
        frameborder="0"
        allowtransparency="true"
      />
    </Col>
  );
};

const mapStateToProps = state => ({
  articles: getArticlesWithContributors(state),
  media: state.media.media,
  sections: state.sections.sections,
});

export default connect(mapStateToProps)(injectSheet(styles)(RightColumn));
