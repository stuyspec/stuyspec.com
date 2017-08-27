import React from 'react';
import { connect } from 'react-redux';
import injectSheet from 'react-jss';
import { Grid, Row, Col } from "react-bootstrap/lib";
import { bindActionCreators } from "redux";

import Comment from './Comment';
import CommentForm from './CommentForm';
import ModalOverlayLogin from './ModalOverlayLogin';

import {
  getCommentsFromArticle,
  getAuthorshipsFromArticle,
  getMediaCreatorFromArticle,
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
                         postComment,
                         article,
                         authorships,
                         media,
                         activeUser,
                         isModalOpen,
                         closeModalLogin,
                       }) => {
  return (
    <div className={classes.CommentThread}>
      <Grid>
        <Row>
          {activeUser ?
            <CommentForm initialValues={{
              userId: activeUser.id,
              articleId: article.id
            }}
                         activeUser={activeUser}
                         onSubmit={postComment}/> :
            <CommentForm activeUser={activeUser}/>
          }
          <Col md={5} lg={5}/>
        </Row>
      </Grid>
      <ModalOverlayLogin isModalOpen={isModalOpen}
                         closeModalLogin={closeModalLogin}/>
      {Object.values(comments).map(comment => {
        return <Comment comment={comment}
                        key={comment.id}
                        authorships={authorships}
                        media={media}
                        activeUser={activeUser}
                        closeModalLogin={closeModalLogin}/>;
      })}
    </div>
  );
};

/**
 * activeUser: {
    id: 1,
    firstName: "Jason",
    lastName: "Lin",
    username: "jasonlin",
    email: "jasonlin@gmail.com",
    description: "Jason is a web developer for The Spectator.",
    slug: "jason-lin",
    url: "https://scontent-lga3-1.xx.fbcdn.net/v/t1.0-9/17190808_757980897706195_7544830170558586831_n.jpg?oh=628bfb2a1ce2d86e10e13658fb40ed6d&oe=5A28122E"
  },
 */
const mapStateToProps = (state, ownProps) => ({
  comments: getCommentsFromArticle(state, ownProps),
  authorships: getAuthorshipsFromArticle(state, ownProps),
  media: getMediaCreatorFromArticle(state, ownProps),
  activeUser: {
    id: 1,
    firstName: "Jason",
    lastName: "Lin",
    username: "jasonlin",
    email: "jasonlin@gmail.com",
    description: "Jason is a web developer for The Spectator.",
    slug: "jason-lin",
    url: "https://scontent-lga3-1.xx.fbcdn.net/v/t1.0-9/17190808_757980897706195_7544830170558586831_n.jpg?oh=628bfb2a1ce2d86e10e13658fb40ed6d&oe=5A28122E"
  },
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