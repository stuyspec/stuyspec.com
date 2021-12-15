// @ts-nocheck
import React from "react";
import { useQuery } from "react-apollo";
import { createUseStyles } from "react-jss";
import Grid from "react-bootstrap/lib/Grid";
import { Helmet } from "react-helmet";
import { match } from 'react-router';

import { ArticleHeader, ArticleBody, ArticleFooter, ArticleCommentSection, RecommendedRow } from "./";
import { GoogleAdsense } from "../../advertisements/components";
import { ARTICLE_QUERY, IArticleData, IArticleVariables } from "../queries";
import { NotFoundPage } from "../../core/components";

const styles = {
  subscribe: {
    color: "#3572b7",
    "&:hover, &:focus, &:active": {
      color: "#3572b7",
    },
    "&:hover": {
      cursor: "pointer",
    },
  },
  "@media (max-width: 1199px)": {
    ArticlePage: {
      padding: "0 8%",
    },
  },
  "@media (max-width: 991px)": {
    ArticlePage: {
      padding: 0,
    },
  },
};

const useStyles = createUseStyles(styles);

interface IProps {
  match: match<{ article_slug: string }>
}

const ArticlePage: React.FC<IProps> = ({ match }) => {
  const classes: any = useStyles();

  const result = useQuery<IArticleData, IArticleVariables>(ARTICLE_QUERY, {
    variables: { slug: match.params.article_slug }
  })

  if (result.error) {
    return <NotFoundPage />;
  }

  const article = result?.data?.articleBySlug;

  if (!article) {
    return null;
  }

  const { section } = article;

  return (
    <Grid fluid className={classes.ArticlePage}>
      <Helmet>
        <title>{article.title} | The Stuyvesant Spectator</title>
        <meta name="fb:app_id" content="510092146640696" />
      </Helmet>
      <ArticleHeader article={article} />
      <ArticleBody article={article} />
      <ArticleFooter article={article} />
      <ArticleCommentSection />
      {/* <GoogleAdsense
          adClient='ca-pub-6227330768557696'
          adSlot='1527604127'
          style=
            {{
              'display':'block',
              minHeight: '10vh',
              minWidth: '20vw',
            }}
          adLayout='in-article'
          adFormat='auto'
          fullWidthResponsive='true'
        /> */}

      <RecommendedRow section={section.parent_section || section} />
    </Grid>
  );
}

export default ArticlePage;
