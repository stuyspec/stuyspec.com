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
  return (
    <Grid className={ classes.ArticleList }>
      {
        Object.values(articles).map(article => {
          return <ArticleRow article={ article } key={ article.id }/>;
        })
      }
    </Grid>
  )
};

export default injectSheet(styles)(ArticleList);