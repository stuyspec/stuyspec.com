import React from "react";
import injectSheet from "react-jss";

import ArticleFeaturedMedia from "./ArticleFeaturedMedia";

const styles = {
  ArticleBody: {
    color: '#000',
    fontFamily: 'Minion Pro',
    fontSize: '18px',
    lineHeight: 1.44,
    width: '700px',
    '& p:first-child::first-letter': {
      float: 'left',
      fontSize: '58px',
      lineHeight: '43px',
      padding: '7px 6px 0px 3px',
    },
  },
  content: {
    marginTop: '13px',
  }
};

const ArticleBody = ({ classes, article, featuredMedia }) => {
  return (
    <div className={ classes.ArticleBody }>
      <ArticleFeaturedMedia article={ article }
                            featuredMedia={ featuredMedia }
                            putCaption={ true }/>
      <div className={ classes.content }
           dangerouslySetInnerHTML={ { __html: article.content } }/>
    </div>
  );
};

export default injectSheet(styles)(ArticleBody);
