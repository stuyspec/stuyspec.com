import React from 'react';
import { connect } from 'react-redux';
import injectSheet from 'react-jss';

import { getUserFromReply } from "../selectors";

const styles = {
  Reply: {
    marginTop: "10px",
    paddingLeft: "60px",
    paddingBottom: "30px",
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

const Reply = ({ classes, reply, user }) => {
  return (
    <div className={classes.Reply}>
      <img src={user.url} alt={user.username} className={classes.userImg}/>
      <p className={classes.userName}>{user.firstName} {user.lastName}</p>
      <p className={classes.content}>{reply.content}</p>
    </div>
  )
};

const mapStateToProps = (state, ownProps) => ({
  user: getUserFromReply(state, ownProps),
});

export default connect(
  mapStateToProps
)(injectSheet(styles)(Reply));