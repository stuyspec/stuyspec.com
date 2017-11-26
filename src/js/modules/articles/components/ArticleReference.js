import React from "react";
import { connect } from "react-redux";
import injectSheet from "react-jss";
import { Link } from "react-router-dom";

const styles = {
  ArticleReference: {
    display: "block",
    fontStyle: "italic",
    marginTop: "12px",
    marginBottom: "24px",
  },
  referenceLink: {
    color: "#000",
    textDecoration: "underline",
    "&:hover": {
      color: "#000",
    },
    "&:active": {
      color: "#000",
    },
    "&:focus": {
      color: "#000",
    },
  },
  "@media (max-width: 991px)": {
    ArticleReference: {
      padding: "0 10%",
    },
  },
  "@media (max-width: 767px)": {
    ArticleReference: {
      padding: "0 2%",
    },
  },
};

const ArticleReference = ({ classes, articles, sections, articleId }) => {
  if (!(articleId in articles)) {
    console.error(
      `No articles with id ${articleId} found for ArticleReference.`,
    );
    return <span />;
  }
  const referencedArticle = articles[articleId];
  // Since the title will be surrounded with double quotes, we replace the
  // title's double quotes (for movies, books, etc.) with single quotes.
  const referencedTitle = referencedArticle.title
    .replace('"', "'") // straight double quote
    .replace("“", "‘") // curly left double quote
    .replace("”", "’"); // curly right double quote
  return (
    <span className={classes.ArticleReference}>
      This article was written in response to &ldquo;
      <Link
        className={classes.referenceLink}
        to={`${sections[referencedArticle.sectionId]
          .permalink}/${referencedArticle.slug}`}
      >
        {referencedTitle}
      </Link>
      ,&rdquo; published in Volume {referencedArticle.volume} Issue{" "}
      {referencedArticle.issue}.
    </span>
  );
};

const mapStateToProps = state => ({
  articles: state.articles.articles,
  sections: state.sections.sections,
});

export default connect(mapStateToProps)(injectSheet(styles)(ArticleReference));
