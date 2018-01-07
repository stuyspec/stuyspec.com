import React from "react";
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
    "&:hover, &:active, &:focus": {
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

const ArticleReference = ({ classes, article }) => {
  // Since the title will be surrounded with double quotes, we replace the
  // title's double quotes (for movies, books, etc.) with single quotes.
  const title = article.title
    .replace('"', "'") // straight double quote
    .replace("“", "‘") // curly left double quote
    .replace("”", "’"); // curly right double quote
  return (
    <span className={classes.ArticleReference}>
      This article was written in response to &ldquo;
      <Link
        className={classes.referenceLink}
        to={`${article.section.permalink}/${article.slug}`}
      >
        {title}
      </Link>
      ,&rdquo; published in Volume {article.volume} Issue {article.issue}.
    </span>
  );
};

export default injectSheet(styles)(ArticleReference);
