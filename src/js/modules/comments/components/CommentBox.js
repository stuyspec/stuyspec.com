import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from "redux";
import injectSheet from 'react-jss';

import {
  expandTextBox,
  shrinkTextBox,
  toggleLogIn,
  updateComment,
} from "../action";

const styles = {
  CommentBox: {

  },
  smallBox: {
    height: "20px",
    width: "300px",
  },
  bigBox: {
    height: "200px",
    width: "400px",
  }
};

//TODO:delete comment if changing location
const CommentBox = ({ classes,
                      expandTextBox,
                      shrinkTextBox,
                      toggleLogIn,
                      updateComment,
                      comments,
                      isExpanded,
                      isUserLoggedIn,
                      commentText,}) => {
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
  return (
    <div className={classes.CommentBox}>
      <h1>Comments</h1>
      <button onClick={handleLogIn}>toggle Log In </button>
      <hr/>
      <input type="text"
             placeholder="Comment"
             value={commentText}
             onChange={changeText}
             onClick={checkUser}
             onBlur={minimizeTextBox}
             className={isExpanded ? classes.bigBox :
                                     classes.smallBox}/>
    </div>
  )
  //also, change the className based on expanded or not
};
//TODO:put these in selectors
const mapStateToProps = (state) => ({
  comments: state.comments.comments,
  isExpanded: state.comments.isExpanded,
  isUserLoggedIn: state.comments.isUserLoggedIn,
  commentText: state.comments.commentText,
});

const mapDispatchToProps = dispatch => {
  return bindActionCreators(
    { expandTextBox, shrinkTextBox, toggleLogIn, updateComment},
    dispatch
  );
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(injectSheet(styles)(CommentBox));