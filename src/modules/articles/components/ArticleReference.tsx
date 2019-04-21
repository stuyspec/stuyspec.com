import React from "react";
import { graphql, ChildDataProps } from "react-apollo";
import injectSheet from "react-jss";
import { Link } from "react-router-dom";
import { SPEC_REFERENCE_PATTERN } from "../../../constants";

import { ARTICLE_REFERENCE_QUERY, IArticleReferenceData, IArticleReferenceVariables, IArticle } from '../queries';

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

type IProps = ChildDataProps<{ classes: any, article: IArticle }, IArticleReferenceData, IArticleReferenceVariables>;

const ArticleReference: React.FunctionComponent<IProps> = ({ classes, data }) => {
  if (!data || data.loading || data.error || !data.articleByID) {
    return null;
  }
  const article = data.articleByID;
  // Since the title will be surrounded with double quotes, we replace the
  // title's double quotes (for movies, books, etc.) with single quotes.
  const title = article.title
    .replace('"', "'")
    .replace("“", "‘")
    .replace("”", "’");
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

const withArticleReference = graphql<{article: IArticle}, IArticleReferenceData, IArticleReferenceVariables>(ARTICLE_REFERENCE_QUERY, {
  // skip this query if no referencedArticleId was found in article content
  skip: ({ article }) => !SPEC_REFERENCE_PATTERN.test(article.content),
  options: ({ article }) => {
    const regex = SPEC_REFERENCE_PATTERN.exec(article.content);
    const article_id = regex ? parseInt(regex[1], 10).toString() : "";
    return {
      variables: {
        article_id
      },
    }
  },
})

export default withArticleReference(injectSheet(styles)(ArticleReference));
