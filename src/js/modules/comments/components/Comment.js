import React from 'react';
import { connect } from 'react-redux';
import injectSheet from 'react-jss';
import { Grid, Row, Col } from 'react-bootstrap/lib';

const styles = {
  Comment: {
    fontFamily: 'Minion Pro',
    marginBottom: '18px',
  },
  commentInfo: {
    marginBottom: '2px',
  },
  userName: {
    fontSize: '18px',
    fontWeight: 'bold',
    color: '#000',
  },
  content: {
    color: '#000',
    fontSize: '16px',
    lineHeight: '1.5',
    margin: 0,
  },
  bulletPoint: {
    color: '#ccc',
    fontSize: '12px',
    margin: '0 4px',
    position: 'relative',
  },
  publishedAt: {
    color: '#a8a8a8',
    fontSize: '16px',
    fontWeight: 300,
  },
};

const Comment = ({ classes, comment, users }) => {
  const user = users[comment.userId];
  return (
    <Row className={classes.Comment}>
      <Col md={7} lg={7}>
        <p className={classes.commentInfo}>
          <span className={classes.userName}>
            {user.firstName} {user.lastName}
          </span>
          <span className={classes.bulletPoint}>&#8226;</span>
          <span className={classes.publishedAt}>{comment.publishedAt}</span>
        </p>
        <p className={classes.content}>{comment.content}</p>
      </Col>
      <Col md={5} lg={5} />
    </Row>
  );
};

const mapStateToProps = (state, ownProps) => ({
  users: state.users.users,
});

export default connect(mapStateToProps)(injectSheet(styles)(Comment));
