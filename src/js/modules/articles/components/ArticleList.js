import React from "react";
import Grid from "react-bootstrap/lib/grid";
import injectSheet from "react-jss";

import ArticleRow from "./ArticleRow";

const styles = {
  ArticleList: {
    padding: 0,
  },
};

const ArticleList = ({ classes, articles }) => {
  const createArticleRows = () => {
    return Object.values(articles).map(article => {
      return <ArticleRow article={ article }
                         key={ article.id }/>;
    })
  };
  return (
    <Grid className={ classes.ArticleList }>
      { createArticleRows() }
    </Grid>
  )
};

export default injectSheet(styles)(ArticleList);