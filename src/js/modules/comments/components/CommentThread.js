import React from 'react';
import { connect } from 'react-redux';
import injectSheet from 'react-jss';
import { Grid, Row, Col } from "react-bootstrap/lib";
import { bindActionCreators } from "redux";

import Comment from './Comment';
import CommentForm from './CommentForm';

import {
  getCommentsFromArticle,
  getAuthorshipsFromArticle,
  getMediaCreatorFromArticle,
} from "../../articles/selectors";
import { postComment} from "../actions";

const styles = {
  CommentThread: {
    padding: 0,
  },
};

const CommentThread = ({ classes,
                         comments,
                         postComment,
                         authorships,
                         media,}) => {
  return (
    <div className={classes.CommentThread}>
      <Grid>
        <Row>
          <CommentForm onSubmit={postComment}/>
          <Col md={5} lg={5}/>
        </Row>
      </Grid>
      {Object.values(comments).map(comment => {
        return <Comment comment={comment}
                        key={comment.id}
                        authorships={authorships}
                        media={media}/>;
      })}
    </div>
  );
};

const mapStateToProps = (state, ownProps) => ({
  comments: getCommentsFromArticle(state, ownProps),
  authorships: getAuthorshipsFromArticle(state, ownProps),
  media: getMediaCreatorFromArticle( state, ownProps),
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