import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from "redux";
import injectSheet from 'react-jss';

import Comment from './Comment';

import { getCommentsFromArticle } from "../../articles/selectors";

import {
  expandTextBox,
  shrinkTextBox,
  toggleLogIn,
  updateComment,
} from "../action";

const styles = {
  CommentBox: {},
  smallBox: {
    height: "20px",
    marginBottom: "10px",
    width: "300px",
  },
  bigBox: {
    height: "200px",
    marginBottom: "10px",
    width: "400px",
  }
};

const CommentBox = ({
                      classes,
                      expandTextBox,
                      shrinkTextBox,
                      toggleLogIn,
                      updateComment,
                      article,
                      comments,
                      isExpanded,
                      isUserLoggedIn,
                      commentText,
                    }) => {
  const checkUser = () => {
    //TODO: Wait for the account module to be done to implement User check
    if (isUserLoggedIn) {
      if (!isExpanded) {
        expandTextBox();
      }
    } else {
      console.log('needs to be log in');
    }
  };
  const minimizeTextBox = () => {
    shrinkTextBox();
  };
  const changeText = (event) => {
    if (isExpanded) {
      updateComment(event.target.value);
    }
  };
  const handleLogIn = () => {
    toggleLogIn();
  };
  const createComments = () => {
    return Object.values(comments).map(comment => (
      <Comment comment={comment} key={comment.id}/>
    ))
  };
  return (
    <div className={classes.CommentBox}>
      <h1>Comments</h1>
      <button onClick={handleLogIn}>toggle Log In</button>
      <hr/>
      <input type="text"
             placeholder="Comment"
             value={commentText}
             onChange={changeText}
             onClick={checkUser}
             onBlur={minimizeTextBox}
             className={isExpanded ? classes.bigBox : classes.smallBox}
      />
      {createComments()}
    </div>
  )
};

const mapStateToProps = (state, ownProps) => ({
  comments: getCommentsFromArticle(state, ownProps),
  isExpanded: state.comments.isExpanded,
  isUserLoggedIn: state.comments.isUserLoggedIn,
  commentText: state.comments.commentText,
});

const mapDispatchToProps = dispatch => {
  return bindActionCreators(
    { expandTextBox, shrinkTextBox, toggleLogIn, updateComment },
    dispatch
  );
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(injectSheet(styles)(CommentBox));