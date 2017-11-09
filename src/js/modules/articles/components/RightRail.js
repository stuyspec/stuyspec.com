import React from "react";
import { connect } from "react-redux";
import injectSheet from "react-jss";
import { Link } from "react-router-dom";

import Byline from "./Byline";
import { getArticlesWithContributors } from "../selectors";

const NUMBER_OF_RAIL_ARTICLES = 5;

const styles = {
  RightRail: {
    marginTop: "28px",
  },
  label: {
    borderTop: "1px solid #000",
    borderBottom: "1px solid #ddd",
    color: "#000",
    display: "block",
    fontFamily: "Circular Std",
    fontSize: "13px",
    fontWeight: 300,
    margin: "0 0 12px 0",
    padding: "4px 0",
    "&:hover": {
      color: "#000",
    },
    "&:focus": {
      color: "#000",
    },
  },
  article: {
    borderBottom: "solid 1px #ddd",
    paddingBottom: "9px",
    marginBottom: "7px",
  },
  bigTitle: {
    color: "#000",
    fontFamily: "Minion Pro",
    fontSize: "18px",
    fontWeight: "bold",
    lineHeight: "1.22",
    marginBottom: "7px",
  },
  smallTitle: {
    color: "#000",
    fontFamily: "Minion Pro",
    fontSize: "15px",
    lineHeight: "1.25",
  },
  sectionLabel: {
    color: "#000",
    display: "block",
    fontFamily: "Minion Pro",
    fontSize: "12px",
    marginBottom: "6px",
    textTransform: "uppercase",
    "&:hover": { color: "#000", textDecoration: "none" },
    "&:focus": { color: "#000", textDecoration: "none" },
  },
  figure: {
    float: "right",
    margin: "0",
    width: "62px",
    "& img": {
      width: "100%",
    },
  },
  preview: {
    color: "#000",
    fontFamily: "Minion Pro",
    fontSize: "14px",
    lineHeight: "1.29",
    marginBottom: "13px",
  },
  Byline: {
    color: "#888",
    fontFamily: "Circular Std",
    fontSize: "12px",
    fontWeight: "300",
    marginBottom: "3px",
    "& p": {
      margin: "0",
      display: "inline",
      "& a": {
        color: "#888",
        "&:hover": {
          color: "#888",
        },
      },
    },
  },
  Dateline: {
    color: "#888",
    fontFamily: "Circular Std",
    fontSize: "12px",
    fontWeight: "300",
    margin: 0,
    "& p": {
      color: "#000",
      margin: 0,
      display: "inline",
    },
  },
  "@media (max-width: 991px)": {
    RightRail: {
      paddingLeft: "1.5vw"
    }
  }
};

// inside a Col
const RightRail = ({ classes, articles, sections, media }) => {
  return (
    <div className={classes.RightRail}>
      <Link to="/recommended" className={classes.label}>
        Recommended
      </Link>
      {Object.values(articles)
        .slice(0, NUMBER_OF_RAIL_ARTICLES)
        .map(article => {
          const featuredMedia = Object.values(media).find(
            mediaObject => mediaObject.articleId === article.id,
          );
          const section = Object.values(sections).find(
            section => article.sectionId === section.id,
          );
          return (
            <div className={classes.article} key={article.id}>
              {featuredMedia && (
                <figure className={classes.figure}>
                  <img src={featuredMedia.url} />
                </figure>
              )}
              <Link
                to={`${section.permalink}/${article.slug}`}
                className={classes.smallTitle}
              >
                {article.title}
              </Link>
              <Byline classes={classes} contributors={article.contributors} />
            </div>
          );
        })}
    </div>
  );
};

const mapStateToProps = state => ({
  articles: getArticlesWithContributors(state),
  media: state.media.media,
  sections: state.sections.sections,
});

export default connect(mapStateToProps)(injectSheet(styles)(RightRail));
