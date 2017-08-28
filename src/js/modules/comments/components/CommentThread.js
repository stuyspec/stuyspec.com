import React from "react";
import { connect } from "react-redux";
import injectSheet from "react-jss";
import { Grid, Row, Col } from "react-bootstrap/lib";
import { bindActionCreators } from "redux";

import Comment from "./Comment";
import CommentForm from "./CommentForm";
import LoginModalOverlay from "../../accounts/components/LoginModalOverlay";

import { createComment, closeLoginModal } from "../actions";
import { signIn } from "../../accounts/actions";
import { getRequestedArticleComments } from "../../articles/selectors";

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
                         closeLoginModal,
                         isModalOpen,
                         session,
                         signIn,
                       }) => {
  const handleSubmit = values => {
    createComment({
      ...values,
      articleId: article.id,
      userId: session.data.data.id
    });
  };
  return (
    <Grid className={ classes.CommentThread }>
      <Row>
        <CommentForm session={ session } onSubmit={ handleSubmit }/>
        <Col md={ 5 } lg={ 5 }/>
      </Row>
      <LoginModalOverlay isModalOpen={ isModalOpen }
                         closeModalLogin={ closeLoginModal }
                         signIn={signIn}/>
      {
        Object.values(comments).map(comment => {
          return <Comment comment={ comment } key={ comment.id }/>;
        })
      }
    </Grid>
  );
};

const mapStateToProps = (state, ownProps) => ({
  comments: getRequestedArticleComments(state, ownProps),
  isModalOpen: state.comments.isModalOpen,
  session: state.accounts.session,
});

const mapDispatchToProps = dispatch => {
  return bindActionCreators(
    { createComment, closeLoginModal, signIn },
    dispatch);
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(injectSheet(styles)(CommentThread));