import React from 'react';
import { connect } from 'react-redux';
import injectSheet from 'react-jss';
import { Grid, Row, Col } from "react-bootstrap/lib";
import { bindActionCreators } from "redux";

import Comment from './Comment';
import CommentForm from './CommentForm';
import ModalOverlayLogin from './ModalOverlayLogin';

import {
  getCommentsFromArticle
} from "../../articles/selectors";
import { postComment, closeModalLogin } from "../actions";

const styles = {
  CommentThread: {
    padding: 0,
  },
};

const CommentThread = ({
                         classes,
                         comments,
                         article,
                         session,
                         isModalOpen,
                         closeModalLogin,
                       }) => {
  const handleSubmit = values => {
    createComment({ ...values, userId: session.id, articleId: article.id });
  };
  return (
    <div className={ classes.CommentThread }>
      <Grid>
        <Row>
          <CommentForm session={ session } onSubmit={ handleSubmit }/>
          <Col md={ 5 } lg={ 5 }/>
        </Row>
      </Grid>
      { /* TODO: rename to login modal*/ }
      <ModalOverlayLogin isModalOpen={ isModalOpen } closeModalLogin={ closeModalLogin }/>
      {
        Object.values(comments).map(comment => {
          return <Comment article={ article }
                          comment={ comment }
                          key={ comment.id }
                          session={ session }
                          closeModalLogin={ closeModalLogin }/>;
        })
      }
      </div>
  );
};

const mapStateToProps = (state, ownProps) => ({
  comments: getCommentsFromArticle(state, ownProps),
  session: state.accounts.session,
  isModalOpen: state.comments.isModalOpen,
});

const mapDispatchToProps = dispatch => {
  return bindActionCreators(
    { postComment, closeModalLogin },
    dispatch
  );
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(injectSheet(styles)(CommentThread));