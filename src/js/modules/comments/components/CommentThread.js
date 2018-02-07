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

class CommentThread extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.props.session && this.props.session !== prevProps.session) {
      /* If there is a session now, a user has just logged in. We want their
       * information, so refetch. */
      this.props.data.refetch();
    }
  }

  handleCreateComment = values => {
    this.props.createComment(
      {
        ...values,
        articleId: this.props.article.id,
        userId: this.props.data.userByUID.id,
      },
      this.props.session,
    );
  };

  render() {
    let { classes, article, data } = this.props;
    if (data && data.loading) {
      return null;
    }
    let currentUser = null;
    if (data && data.userByUID) {
      data = humps.camelizeKeys(data);
      currentUser = data.userByUID;
    }
    return (
      <Grid fluid className={classes.CommentThread}>
        <Row className={classes.commentFormContainer}>
          <CommentForm
            currentUser={currentUser}
            onSubmit={this.handleCreateComment}
          />
          <Col md={4} lg={4} />
        </Row>
        <SignInModal />
        {article.comments.map(comment => {
          return <Comment comment={comment} key={comment.id} />;
        })}
      </Grid>
    );
  }
}

const mapStateToProps = (state, ownProps) => ({
  session: state.accounts.session,
});

const mapDispatchToProps = dispatch => {
  return bindActionCreators({ createComment }, dispatch);
};

export default compose(
  // connect is placed above graphql so options can use props.session as a variable
  connect(mapStateToProps, mapDispatchToProps),
  graphql(UserByUIDQuery, {
    options: ({ session }) => ({
      fetchPolicy: "network-only",
      variables: { uid: (session && session.uid) || "" },
    }),
  }),
  injectSheet(styles),
)(CommentThread);
