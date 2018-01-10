import React from "react";
import { connect } from "react-redux";
import injectSheet from "react-jss";
import { Grid, Row, Col } from "react-bootstrap/lib";
import { bindActionCreators } from "redux";

import Comment from "./Comment";
import CommentForm from "./CommentForm";
import { SignInModal } from "../../accounts/components";

import { createComment } from "../actions";

const CommentThreadQuery = gql`
  query CommentThreadQuery($uid: String!) {
    userByUID(uid: $uid) {
      id
      first_name
      last_name
    }
  }
`;

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

const CommentThread = ({
  classes,
  article,
  createComment,
  data,
  session,
}) => {
  if (data.loading) {
    return null;
  }
  data = humps.camelizeKeys(data);
  const { userByUID } = data;

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
        <CommentForm currentUser={userByUID} onSubmit={handleCreateComment} />
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
  graphql(CommentThreadQuery, {
    options: ({ session }) => ({ variables: { uid: session.uid } }),
  }),
  connect(mapStateToProps, mapDispatchToProps),
  injectSheet(styles)
)(CommentThread);
