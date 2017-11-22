import React from "react";
import { Grid } from "react-bootstrap/lib";
import injectSheet from "react-jss";

import ArticleRow from "./ArticleRow";

const styles = {
  ArticleList: {
    padding: 0,
    width: "100%",
  },
  title: {
    color: "#000",
    fontFamily: "Canela",
    fontSize: "48px",
    fontWeight: 500,
    lineHeight: 1,
    marginBottom: "11px",
  },
  label: {
    borderBottom: "solid 1px #ddd",
    borderTop: "solid 1px #000",
    color: "#000",
    fontFamily: "Circular Std",
    fontSize: "13px",
    fontWeight: "300",
    padding: "4px 0",
    marginBottom: "22px",
  },
};

const ArticleList = ({ classes, articles, title, label }) => {
  let rowArticles = articles;
  if (title !== "Recommended") {
    rowArticles = Object.values(articles).sort((a, b) => {
      return new Date(a) - new Date(b);
    });
  }
  return (
    <Grid className={classes.ArticleList}>
      {title && <p className={classes.title}>{title}</p>}
      {label && <p className={classes.label}>{label}</p>}
      {rowArticles.map(article => {
        return <ArticleRow article={article} key={article.id} />;
      })}
    </Grid>
  );
};

export default injectSheet(styles)(ArticleList);
