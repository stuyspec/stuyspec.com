import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import injectSheet from "react-jss";

import { getMedia } from "../../../media/selectors";
import { getSections } from "../../../sections/selectors";
import { getArticlesFromSection } from "../../selectors";
import Dateline from "../Dateline";
import Byline from "../Byline";

const styles = {
  SectionBlock: {
    marginBottom: "24px",
  },
  article: {
    borderBottom: "solid 1px #ddd",
    paddingBottom: "12px",
    marginBottom: "10px",
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
    fontSize: "16px",
    lineHeight: "1.25",
  },
  label: {
    color: "#000",
    fontFamily: "Minion Pro",
    fontSize: "12px",
    marginBottom: "6px",
    textTransform: "uppercase",
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
};

const SectionBlock = ({ classes, articles, section, media, allSections }) => {
  const articleArray = Object.values(articles);
  const bigArticle = articleArray[0];
  const nextThreeArticles = articleArray.slice(1, 4);
  return (
    <div className={classes.SectionBlock}>
      <p className={classes.label}>{section.name}</p>
      <div className={classes.article}>
        <Link
          to={`${allSections[bigArticle.sectionId]
            .permalink}/${bigArticle.slug}`}
          className={classes.bigTitle}
        >
          {bigArticle.title}
        </Link>
        <p className={classes.preview}>
          Motivational speaker and personal Trainer Carlos Bernal visited
          Stuyvesant on May 26, 2017, at the request of Stuyvesant Amnesty
          International.
        </p>
        <Byline classes={classes} contributors={bigArticle.contributors} />
        <Dateline classes={classes} article={bigArticle} />
      </div>
      {nextThreeArticles.map(article => {
        const featuredMedia = Object.values(media).find(mediaObject => {
          return mediaObject.isFeatured && mediaObject.articleId === article.id;
        });
        return (
          <div className={classes.article} key={article.id}>
            {featuredMedia && (
              <figure className={classes.figure}>
                <img src={featuredMedia.url} />
              </figure>
            )}
            <Link
              to={`${allSections[article.sectionId].permalink}/${article.slug}`}
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

const mapStateToProps = (state, ownProps) => ({
  media: getMedia(state),
  articles: getArticlesFromSection(state, ownProps),
  allSections: getSections(state),
});

export default connect(mapStateToProps)(injectSheet(styles)(SectionBlock));
