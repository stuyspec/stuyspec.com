import {
  POST_COMMENT_REJECTED,
  POST_COMMENT_FULFILLED,
  POST_COMMENT_PENDING,
  POST_REPLY_FULFILLED,
  POST_REPLY_PENDING,
  POST_REPLY_REJECTED,
  OPEN_REPLY_BOX,
  FETCH_COMMENTS_PENDING,
  FETCH_COMMENTS_FULFILLED,
  FETCH_COMMENTS_REJECTED,
  FETCH_REPLIES_FULFILLED,
  FETCH_REPLIES_PENDING,
  FETCH_REPLIES_REJECTED,
  OPEN_MODAL_LOGIN,
  CLOSE_MODAL_LOGIN,
} from './actionTypes';

const initialState = {
  isPostingComment: false,
  isCommentPosted: false,
  isPostingReply: false,
  isReplyPosted: false,
  isFetchingComments: false,
  isCommentsFetched: false,
  isFetchingReplies: false,
  isRepliesFetched: false,
  isModalOpen: false,
  error: null,
  isExpanded: false,
  openReplyBox: [],
  comments: {},
  replies: {},
  response: {}
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case "@@redux-form/FOCUS": {
      return { ...state, isExpanded: true };
    }
    case "@@redux-form/DESTROY": {
      return { ...state, openReplyBox: [], isModalOpen: false };
    }
    case POST_COMMENT_FULFILLED: {
      return { ...state, isPostingComment: true, response: action.payload };
    }
    case POST_COMMENT_PENDING: {
      return { ...state, isCommentPosted: true, isPostingComment: false };
    }
    case POST_COMMENT_REJECTED: {
      return { ...state, error: action.payload };
    }
    case POST_REPLY_FULFILLED: {
      return { ...state, isPostingReply: true, response: action.payload };
    }
    case POST_REPLY_PENDING: {
      return { ...state, isReplyPosted: true, isPostingReply: false };
    }
    case POST_REPLY_REJECTED: {
      return { ...state, error: action.payload };
    }
    case OPEN_REPLY_BOX: {
      console.log(state.openReplyBox);
      if (!(state.openReplyBox.includes(action.payload))) {
        const newOpenReplyBox = state.openReplyBox.concat(action.payload);
        return { ...state, openReplyBox: newOpenReplyBox };
      } else {
        return state;
      }
    }
    case FETCH_COMMENTS_PENDING: {
      return { ...state, isFetchingComments: true };
    }
    case FETCH_COMMENTS_FULFILLED: {
      return {
        ...state,
        isCommentsFetched: true,
        isFetchingComments: false,
        comments: {
          ...state.comments,
          ...action.payload.reduce((acc, comment) => {
            acc[ comment.id ] = comment;
            return acc;
          }, {})
        },
      };
    }
    case FETCH_COMMENTS_REJECTED: {
      return { ...state, isFetchingComments: false, error: action.payload };
    }
    case FETCH_REPLIES_PENDING: {
      return { ...state, isFetchingReplies: true };
    }
    case FETCH_REPLIES_FULFILLED: {
      return {
        ...state,
        isFetchingReplies: false,
        isRepliesFetched: true,
        replies: {
          ...state.replies,
          ...action.payload.reduce((acc, reply) => {
            acc[ reply.id ] = reply;
            return acc;
          }, {})
        },
      };
    }
    case FETCH_REPLIES_REJECTED: {
      return { ...state, isFetchingReplies: false, error: action.payload };
    }
    case OPEN_MODAL_LOGIN: {
      return {...state, isModalOpen:true};
    }
    case CLOSE_MODAL_LOGIN: {
      return {...state, isModalOpen:false};
    }
  }
  return state;
};

export default reducer;