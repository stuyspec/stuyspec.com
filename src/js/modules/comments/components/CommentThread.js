import React from "react";
import { compose } from "redux";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { graphql } from "react-apollo";
import humps from "humps";
import injectSheet from "react-jss";
import { Grid, Row, Col } from "react-bootstrap/lib";

import Comment from "./Comment";
import CommentForm from "./CommentForm";
import { SignInModal } from "../../accounts/components";

import { createComment } from "../actions";
import { UserByUIDQuery } from "../../../queries";

const styles = {
  CommentThread: {
    padding: 0,
    "& textarea": {
      resize: "vertical", // only allows vertical resizing
    },
  },
  "@media (max-width: 991px)": {
    CommentThread: {
      padding: "0 10%",
    },
    commentFormContainer: {
      marginBottom: "36px",
    },
  },
  "@media (max-width: 767px)": {
    CommentThread: {
      padding: "0 2%",
    },
  },
};

const CommentThread = ({ classes, article, createComment, data, session }) => {
  if (data && data.loading) {
    return null;
  }
  let currentUser = null;
  if (data && data.userByUID) {
    data = humps.camelizeKeys(data);
    currentUser = data.userByUID;
  }

  const handleCreateComment = values => {
    createComment(
      {
        ...values,
        articleId: article.id,
        userId: userByUID.id,
      },
      session,
    );
  };
  return (
    <Grid fluid className={classes.CommentThread}>
      <Row className={classes.commentFormContainer}>
        <CommentForm currentUser={currentUser} onSubmit={handleCreateComment} />
        <Col md={4} lg={4} />
      </Row>
      <SignInModal />
      {article.comments.map(comment => {
        return <Comment comment={comment} key={comment.id} />;
      })}
    </Grid>
  );
};

const mapStateToProps = (state, ownProps) => ({
  session: state.accounts.session,
});

const mapDispatchToProps = dispatch => {
  return bindActionCreators({ createComment }, dispatch);
};

export default compose(
  graphql(UserByUIDQuery, {
    skip: ({ session }) => !session,
    options: ({ session }) => ({ variables: { uid: session.uid } }),
  }),
  connect(mapStateToProps, mapDispatchToProps),
  injectSheet(styles),
)(CommentThread);
