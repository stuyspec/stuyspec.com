import React from 'react';
import { connect } from 'react-redux';
import injectSheet from 'react-jss';
import { Grid, Row, Col } from "react-bootstrap/lib";
import { bindActionCreators } from "redux";

import { getUsers } from "../../users/selectors";
import { openReplyBox, postReply } from '../actions';
import { getRepliesFromComment, getUserFromComment } from "../selectors";

import ReplyForm from './ReplyForm';

const styles = {
  Comment: {
    marginBottom: "10px",
  },
  Reply: {
    padding: 0,
    marginBottom: '14px',
  },
  commentInfo: {
    color: '#000',
    fontFamily: 'Circular Std',
    margin: '0 0 6px',
  },
  content: {
    color: '#000',
    fontFamily: 'Minion Pro',
    fontSize: '18px',
    lineHeight: '1.44',
    margin: '0 0 7px',
  },
  mainComment: {
    marginBottom: '14px',
    padding: 0,
  },
  replyComment: {
    background: 'none',
    border: 'none',
    color: '#3572b7',
    fontSize: '16px',
    margin: 0,
    padding: 0,
  },
  bulletPoint: {
    bottom: '1.54px',
    color: '#ccc',
    fontSize: '12px',
    marginLeft: '4px',
    position: 'relative',
  },
  userType: {
    color: '#a8a8a8',
    fontSize: '16px',
    marginLeft: '4px',
  },
  dateline: {
    color: '#a8a8a8',
    fontSize: '16px',
    marginLeft: '4px',
  },
  userName: {
    fontSize: '18px',
    fontWeight: 'bold',
  },
};

const Comment = ({
                   classes,
                   comment,
                   replies,
                   owner,
                   allUsers,
                   authorships,
                   media,
                   openReplyBox,
                   activeReply,
                   activeUser,
                   postReply,
                 }) => {
  const getUserType = (user) => {
    if (authorships.includes(user.id)) {
      return '(article contributor)'
    }
    if (Object.keys(media).includes(user.id.toString())) {
      return `(article ${media[ user.id ].slice(0, -1)})`;
    }
  };
  const openReply = () => {
    openReplyBox(comment.id);
  };
  const createComment = (user, comment) => {
    return (
      <div>
        <p className={classes.commentInfo}>
            <span className={classes.userName}>
              {user.firstName} {user.lastName}
            </span>
          <span className={classes.userType}>
              {getUserType(user)}
            </span>
          <span className={classes.bulletPoint}>&#8226;</span>
          <span className={classes.dateline}>
            {comment.publishedAt}
          </span>
        </p>
        <p className={classes.content}>{comment.content}</p>
        <button className={classes.replyComment}
                onClick={openReply}>
          Reply
        </button>
      </div>
    );
  };
  const createReplies = () => {
    return replies.map(reply => {
      const user = allUsers[ reply.userId ];
      return (
        <Row key={reply.id}>
          <Col mdOffset={1} md={6}
               lgOffset={1} lg={6}
               className={classes.Reply}>
            {createComment(user, reply)}
          </Col>
          <Col md={5} lg={5}/>
        </Row>
      );
    });
  };
  const handlePostReply = (values) => {
    postReply(values, 'replyForm-' + comment.id);
  };
  return (
    <Grid className={classes.Comment}>
      <Row>
        <Col md={7} lg={7} className={classes.mainComment}>
          {createComment(owner, comment)}
        </Col>
        <Col md={5} lg={5}/>
      </Row>
      {createReplies()}
      <Row>
        {activeReply.includes(comment.id) &&
        <ReplyForm form={'replyForm-' + comment.id}
                   key={comment.id}
                   comment={comment}
                   activeUser={activeUser}
                   initialValues={{
                     userId: activeUser.id,
                     commentId: comment.id,
                   }}
                   onSubmit={handlePostReply}
        />}
        <Col md={5} lg={5}/>
      </Row>
    </Grid>
  )
};

const mapStateToProps = (state, ownProps) => ({
  replies: getRepliesFromComment(state, ownProps),
  owner: getUserFromComment(state, ownProps),
  allUsers: getUsers(state),
  activeReply: state.comments.openReplyBox,
});

const mapDispatchToProps = dispatch => {
  return bindActionCreators(
    { openReplyBox, postReply },
    dispatch
  )
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(injectSheet(styles)(Comment));