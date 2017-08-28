import React from 'react';
import { connect } from 'react-redux';
import injectSheet from 'react-jss';
import { Grid, Row, Col } from "react-bootstrap/lib";
import { bindActionCreators } from "redux";

import { getRoles, getUserRoles, getUsers } from "../../users/selectors";
import {
  openReplyBox,
  postReply,
  openModalLogin,
} from '../actions';
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

const Comment = ({ classes, comment, users, session }) => {
  const handleSubmit = values => {
    if (comment.commentId) {
      createReply({...values, commentId: comment.commentId, userId: session.data.data.id });
    } else {
      createComment({ ...values, articleId: article.id, userId: session.data.data.id });
    }
  };
  const user = users[ comment.userId ];
  const offset = comment.parentId ? 1 : 0;
  return (
    <Grid className={ classes.Comment }>
      <Row>
        <Col mdOffset={ offset } lgOffset={ offset } md={ 7 - offset } lg={ 7 - offset }>
          <p className={ classes.commentInfo }>
            <span className={ classes.userName }>
              { user.firstName } { user.lastName }
            </span>
            <span className={ classes.bulletPoint }>&#8226;</span>
            <span className={ classes.dateline }>{ comment.publishedAt }</span>
          </p>
          <p className={ classes.content }>{ comment.content }</p>
          {
            !comment.commentId && (
              <Row>
                <Col mdOffset={ offset } lgOffset={ offset } md={ 7 - offset } lg={ 7 - offset }>
                  <button className={ classes.replyComment } onClick={ openReply }>
                    Reply
                  </button>
                  <ReplyForm form={ 'replyForm-' + comment.id }
                             key={ comment.id }
                             session={ session }
                             onSubmit={ handleSubmit }
                  />
                </Col>
                <Col md={ 5 } lg={ 5 }/>
              </Row>
            )
          }
        </Col>
        <Col md={ 5 } lg={ 5 }/>
      </Row>
    </Grid>
  );
};

const mapStateToProps = (state, ownProps) => ({
  users: getUsers(state),
});

const mapDispatchToProps = dispatch => {
  return bindActionCreators(
    { openReplyBox, postReply, openModalLogin },
    dispatch
  )
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(injectSheet(styles)(Comment));