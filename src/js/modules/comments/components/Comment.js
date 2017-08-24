import React from 'react';
import { connect } from 'react-redux';
import injectSheet from 'react-jss';
import { Grid, Row, Col } from "react-bootstrap/lib";

import { getUsers} from "../../users/selectors";
import { getRepliesFromComment, getUserFromComment } from "../selectors";


//TODO: https://stackoverflow.com/questions/5369301/css-image-scaling-to-fit-within-area-not-distort
//Might be useful for the images
const styles = {
  Comment: {
    marginBottom: "10px",
    padding: 0,
  },
  Reply: {
    padding: 0,
    marginBottom: '14px',
  },
  userName: {
    color: '#000',
    fontFamily: 'Circular Std',
    fontSize: '18px',
    fontWeight: 'bold',
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
    color: '#3572b7',
    fontFamily: 'Circular Std',
    fontSize: '16px',
  },
};

const Comment = ({ classes, comment, replies, owner, allUsers }) => {
  const createReplies = () => {
    return replies.map(reply => {
      const user = allUsers[reply.userId];
      return (
        <Col mdOffset={1} md={6}
             lgOffset={1} lg={6}
             key={reply.id}
             className={classes.Reply}>
          <p className={classes.userName}>{user.firstName} {user.lastName}</p>
          <p className={classes.content}>{reply.content}</p>
          <p className={classes.replyComment}>Reply</p>
        </Col>
      );
    });
  };
  return (
    <Row className={classes.Comment}>
      <Col md={7} lg={7} className={classes.mainComment}>
          <p className={classes.userName}>{owner.firstName} {owner.lastName}</p>
          <p className={classes.content}>{comment.content}</p>
          <p className={classes.replyComment}>Reply</p>
      </Col>
      <Col md={5} lg={5}/>
      {createReplies()}
    </Row>
  )
};

const mapStateToProps = (state, ownProps) => ({
  replies: getRepliesFromComment(state, ownProps),
  owner: getUserFromComment(state, ownProps),
  allUsers: getUsers(state),
});

export default connect(
  mapStateToProps
)(injectSheet(styles)(Comment));