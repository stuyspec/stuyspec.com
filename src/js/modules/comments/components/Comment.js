import React from 'react';
import { connect } from 'react-redux';
import injectSheet from 'react-jss';

import Reply from './Reply';

import { getRepliesFromComment, getUserFromComment } from "../selectors";


//TODO: https://stackoverflow.com/questions/5369301/css-image-scaling-to-fit-within-area-not-distort
//Might be useful for the images
const styles = {
  Comment: {
    border: "solid 2px #000",
    marginBottom: "3px",
  },
  userImg: {
    float: "left",
    height: "50px",
    width: "60px",
  },
  userName: {
    margin: 0,
  },
  content: {
    margin: 0,
  },
};

const Comment = ({ classes, comment, replies, user }) => {
  const createReplies = () => {
    return replies.map(reply => <Reply reply={reply} key={reply.id}/>);
  };
  return (
    <div className={classes.Comment}>
      <img src={user.url} className={classes.userImg} alt={user.username}/>
      <p className={classes.userName}>{user.firstName} {user.lastName}</p>
      <p className={classes.content}>{comment.content}</p>
      {createReplies()}
    </div>
  )
};

const mapStateToProps = (state, ownProps) => ({
  replies: getRepliesFromComment(state, ownProps),
  user: getUserFromComment(state, ownProps),
});

export default connect(
  mapStateToProps
)(injectSheet(styles)(Comment));