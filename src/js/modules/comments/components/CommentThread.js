import React from "react";
import { connect } from "react-redux";
import injectSheet from "react-jss";
import { Grid, Row, Col } from "react-bootstrap/lib";
import { bindActionCreators } from "redux";

import Comment from "./Comment";
import CommentForm from "./CommentForm";
import LoginModalOverlay from "../../accounts/components/LoginModalOverlay";

import { createComment, closeLoginModal } from "../actions";
import { getRequestedArticleComments } from "../../articles/selectors";

const styles = {
  CommentThread: {
    padding: 0,
  },
};

const CommentThread = ({ classes, comments, article, session, isModalOpen, closeLoginModal }) => {
  const handleSubmit = values => {
    console.log(3);
    createComment({
      ...values,
      articleId: article.id,
      userId: session.data.data.id // left off at VM37700:52 Uncaught TypeError: Cannot read property 'data' of null
    });
  };
  return (
    <Grid className={ classes.CommentThread }>
      <Row>
        <CommentForm session={ session } onSubmit={ handleSubmit }/>
        <Col md={ 5 } lg={ 5 }/>
      </Row>
      <LoginModalOverlay isModalOpen={ isModalOpen } closeModalLogin={ closeLoginModal }/>
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
  session: state.accounts.session,
  isModalOpen: state.comments.isModalOpen,
});

const mapDispatchToProps = dispatch => {
  return bindActionCreators({ createComment, closeLoginModal }, dispatch);
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(injectSheet(styles)(CommentThread));