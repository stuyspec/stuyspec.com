import React from "react";
import { connect } from "react-redux";
import injectSheet from "react-jss";
import { Grid, Row, Col } from "react-bootstrap/lib";

import { getUsers } from "../../users/selectors";

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
  publishedAt: {
    color: '#a8a8a8',
    fontSize: '16px',
    fontWeight: 300,
    marginLeft: '4px',
  },
  userName: {
    fontSize: '18px',
    fontWeight: 'bold',
  },
};

const Comment = ({ classes, comment, users }) => {
  const user = users[ comment.userId ];
  return (
    <Row className={ classes.Comment }>
      <Col md={ 7 } lg={ 7 }>
        <p className={ classes.commentInfo }>
          <span className={ classes.userName }>
            { user.firstName } { user.lastName }
          </span>
          <span className={ classes.bulletPoint }>&#8226;</span>
          <span className={ classes.publishedAt }>{ comment.publishedAt }</span>
        </p>
        <p className={ classes.content }>{ comment.content }</p>
      </Col>
      <Col md={ 5 } lg={ 5 }/>
    </Row>
  );
};

const mapStateToProps = (state, ownProps) => ({
  users: getUsers(state),
});

export default connect(mapStateToProps)(injectSheet(styles)(Comment));