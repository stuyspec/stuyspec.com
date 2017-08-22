import React, {Component} from 'react';
import injectSheet from 'react-jss';

const styles = {
  CommentBox: {

  },
};

const CommentBox = ({classes}) => {
  return (
    <div className={classes.CommentBox}>
      HI
    </div>
  )
};

export default injectSheet(styles)(CommentBox);