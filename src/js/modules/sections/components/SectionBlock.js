import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import injectSheet from "react-jss";

import Dateline from "../../articles/components/Dateline";
import Byline from "../../articles/components/Byline";
import { getArticlesWithContributors } from "../../articles/selectors";

const styles = {
  SectionBlock: {
    "& > div:last-child": {
      // targets last article
      border: "none",
      paddingBottom: 0,
    },
  },
  article: {
    borderBottom: "solid 1px #ddd",
    paddingBottom: "12px",
    marginBottom: "10px",
  },
  bigTitle: {
    color: "#000",
    display: "block",
    fontFamily: "Minion Pro",
    fontSize: "18px",
    fontWeight: "bold",
    lineHeight: "1.22",
    marginBottom: "7px",
    "&:hover, &:active, &:focus": {
      color: "#000",
    },
  },
  smallTitle: {
    color: "#000",
    fontFamily: "Minion Pro",
    fontSize: "16px",
    lineHeight: "1.25",
    "&:hover, &:active, &:focus": {
      color: "#000",
    },
  },
  sectionLabel: {
    color: "#000",
    display: "block",
    fontFamily: "Minion Pro",
    fontSize: "12px",
    marginBottom: "6px",
    textTransform: "uppercase",
    "&:hover, &:active, &:focus": {
      color: "#000",
      textDecoration: "none",
    },
  },
  figure: {
    float: "right",
    marginLeft: "6px",
    maxHeight: "45px",
    overflow: "hidden",
    width: "62px",
    "& img": {
      width: "100%",
    },
  },
  summary: {
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
        "&:hover, &:active, &:focus": {
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

const SectionBlock = ({ classes, articles, section, sections, media }) => {
  let sectionArticles = [];
  if (section.name === "Sports") {
    // most sports articles are in subsections
    const subsectionIds = Object.values(sections)
      .filter(subsection => subsection.parentId === section.id)
      .map(subsection => subsection.id);
    sectionArticles = articles.filter(article =>
      subsectionIds.includes(article.sectionId),
    );
  } else {
    sectionArticles = articles.filter(
      article => article.sectionId === section.id,
    );
  }
  const bigArticle = sectionArticles[0];
  const rowArticles = sectionArticles.slice(1, 4);
  return (
    <div className={classes.SectionBlock}>
      <Link to={section.permalink} className={classes.sectionLabel}>
        {section.name}
      </Link>
      {bigArticle && (
        <div className={classes.article}>
          <Link
            to={`${section.permalink}/${bigArticle.slug}`}
            className={classes.bigTitle}
          >
            {bigArticle.title}
          </Link>
          <p className={classes.summary}>{bigArticle.summary}</p>
          <Byline classes={classes} contributors={bigArticle.contributors} />
          <Dateline classes={classes} article={bigArticle} />
        </div>
      )}
      {sectionArticles.length > 1 &&
        sectionArticles.slice(1, 4).map(article => {
          const featuredMedia = Object.values(media).find(mediaObject => {
            return (
              mediaObject.isFeatured && mediaObject.articleId === article.id
            );
          });
          // In the links, we index sections again because the Sports
          // SectionBlock finds articles in not only the given section prop,
          // but also its subsections.
          return (
            <div className={classes.article} key={article.id}>
              {featuredMedia && (
                <Link
                  to={`${sections[article.sectionId]
                    .permalink}/${article.slug}`}
                >
                  <figure className={classes.figure}>
                    <img src={featuredMedia.thumbAttachmentUrl} />
                  </figure>
                </Link>
              )}
              <Link
                to={`${sections[article.sectionId].permalink}/${article.slug}`}
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
  media: state.media.media,
  articles: getArticlesWithContributors(state),
  sections: state.sections.sections,
});

export default connect(mapStateToProps)(injectSheet(styles)(SectionBlock));
