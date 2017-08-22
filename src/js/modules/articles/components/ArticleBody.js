import React from "react";
import injectSheet from "react-jss";

import ArticleFeaturedMedia from "./ArticleFeaturedMedia";
import { CommentBox } from "../../comments/components";

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
};

// TODO: italicized contributor blurb underneath the article content (see nyer)
const ArticleBody = ({ classes, content, featuredMedia }) => {
  return (
    <div className={ classes.ArticleBody }>
      <ArticleFeaturedMedia featuredMedia={ featuredMedia }/>
      <div dangerouslySetInnerHTML={ { __html: content } }/>
      <CommentBox />
    </div>
  );
};

export default injectSheet(styles)(ArticleBody);
