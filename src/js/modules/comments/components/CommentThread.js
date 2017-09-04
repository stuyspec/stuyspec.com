import React from "react";
import { connect } from "react-redux";
import injectSheet from "react-jss";
import { Grid, Row, Col } from "react-bootstrap/lib";
import { bindActionCreators } from "redux";

import Comment from "./Comment";
import CommentForm from "./CommentForm";
import { SignInModal } from "../../accounts/components";

import { createComment } from "../actions";
import { getRequestedArticleComments } from "../selectors";

const styles = {
  CommentThread: {
    padding: 0,
  },
};

const CommentThread = ({
  classes,
  comments,
  article,
  createComment,
  session,
}) => {
  const handleCreateComment = values => {
    createComment({
      ...values,
      articleId: article.id,
      userId: session.userId,
    });
  };
  return (
    <Grid className={classes.CommentThread}>
      <Row>
        <CommentForm session={session} onSubmit={handleCreateComment} />
        <Col md={5} lg={5} />
      </Row>
      <SignInModal />
      {Object.values(comments).map(comment => {
        return <Comment comment={comment} key={comment.id} />;
      })}
    </Grid>
  );
};

const mapStateToProps = (state, ownProps) => ({
  comments: getRequestedArticleComments(state, ownProps),
  session: state.accounts.session,
});

const mapDispatchToProps = dispatch => {
  return bindActionCreators({ createComment }, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(
  injectSheet(styles)(CommentThread),
);
