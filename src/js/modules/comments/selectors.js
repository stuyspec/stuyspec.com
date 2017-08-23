import { createSelector } from 'reselect';
import { getUsers } from "../users/selectors";

export const getComments = (state) => state.comments.comments;
const getCommentFromProps = (state, props) => props.comment;
const getReplyFromProps = (state,props) => props.reply;
const getReplies = (state) => state.comments.replies;

export const getRepliesFromComment = createSelector(
  [ getCommentFromProps, getReplies ],
  (comment, replies) => {
    return Object.values(replies).filter(reply => {
      return reply.commentId === comment.id;
    });
  }
);

export const getUserFromComment = createSelector(
  [ getCommentFromProps, getUsers ],
  (comment, users) => {
    return Object.values(users).filter(user => user.id === comment.userId)[ 0 ];
  }
);

export const getUserFromReply = createSelector(
  [ getReplyFromProps, getUsers ],
  (reply, users) => {
    return Object.values(users).filter(user => user.id === reply.userId)[ 0 ];
  }
);
