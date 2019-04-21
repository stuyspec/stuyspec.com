import React, { PureComponent } from "react";
import { compose } from "redux";
import { graphql, ChildDataProps } from "react-apollo";
import injectSheet from "react-jss";
import Grid from "react-bootstrap/lib/Grid";
import { Helmet } from "react-helmet";
import { match } from 'react-router';

import { ArticleHeader, ArticleBody, ArticleFooter, RecommendedRow } from "./";
import { ARTICLE_QUERY, IArticle, IArticleData, IArticleVariables } from "../queries";

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

type IProps = ChildDataProps<{ classes: any, match: match<{ article_slug: string }> }, IArticleData, IArticleVariables>;

const initialState = {
  article: null as IArticle | null
}

class ArticlePage extends PureComponent<IProps, typeof initialState> {
  constructor(props: IProps) {
    super(props);

    this.state = initialState;
  }

  componentWillReceiveProps(nextProps: IProps) {
    let { data } = nextProps;

    if (data.loading) {
      return;
    }

    if (data.articleBySlug) {
      this.setState({ article: data.articleBySlug });
    }
  }

  render() {
    const { article } = this.state;
    const { classes } = this.props;

    if (!article) {
      return null;
    }

    const { section } = article;

    return (
      <Grid fluid className={classes.ArticlePage}>
        <Helmet titleTemplate="%s | The Stuyvesant Spectator">
          <title>{article.title}</title>
        </Helmet>
        <ArticleHeader article={article} />
        <ArticleBody article={article} />
        <ArticleFooter article={article} />
        <RecommendedRow section={section.parent_section || section} />
      </Grid>
    );
  }
}

const withArticle = graphql<{ match: match<{ article_slug: string }> }, IArticleData, IArticleVariables>(ARTICLE_QUERY, {
  options: ({ match }) => ({
    variables: { slug: match.params.article_slug },
  }),
});

export default withArticle(injectSheet(styles)(ArticlePage));
