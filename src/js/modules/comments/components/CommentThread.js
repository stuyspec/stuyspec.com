import React from 'react';
import { connect } from 'react-redux';
import injectSheet from 'react-jss';
import { Grid, Row, Col } from "react-bootstrap/lib";
import { bindActionCreators } from "redux";

import Comment from './Comment';
import CommentForm from './CommentForm';

import { getCommentsFromArticle } from "../../articles/selectors";
import { postComment} from "../actions";

const styles = {
  CommentThread: {
    padding: 0,
  },
};

const CommentThread = ({ classes, comments, postComment }) => {
  return (
    <Grid className={classes.CommentThread}>
      <Row>
        <CommentForm onSubmit={postComment}/>
      </Row>
      {Object.values(comments).map(comment => {
        return <Comment comment={comment} key={comment.id}/>;
      })}
    </Grid>
  );
};

const mapStateToProps = (state, ownProps) => ({
  comments: getCommentsFromArticle(state, ownProps),
});

const mapDispatchToProps = dispatch => {
  return bindActionCreators(
    { postComment },
    dispatch
  );
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(injectSheet(styles)(CommentThread));