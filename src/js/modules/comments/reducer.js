import {
  CREATE_COMMENT_REJECTED,
  CREATE_COMMENT_FULFILLED,
  CREATE_COMMENT_PENDING,
  FETCH_COMMENTS_PENDING,
  FETCH_COMMENTS_FULFILLED,
  FETCH_COMMENTS_REJECTED,
} from "./actionTypes";

const initialState = {
  error: null,
  isFetching: false,
  isFetched: true,
  comments: {},
  status: {
    type: null,
    message: null,
  },
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_COMMENTS_PENDING: {
      return { ...state, isFetching: true, error: null };
    }
    case FETCH_COMMENTS_FULFILLED: {
      return {
        ...state,
        isFetching: false,
        isFetched: true,
        comments: action.payload.reduce((acc, comment) => {
          acc[comment.id] = comment;
          return acc;
        }, {}),
      };
    }
    case FETCH_COMMENTS_REJECTED: {
      return { ...state, error: action.payload };
    }
    case CREATE_COMMENT_PENDING: {
      return { ...state };
    }
    case CREATE_COMMENT_FULFILLED: {
      return {
        ...state,
        status: {
          type: "fulfilled",
          message: `Comment submitted for review at ${action.payload.data
            .createdAt}`,
        },
      };
    }
    case CREATE_COMMENT_REJECTED: {
      return {
        ...state,
        status: {
          type: "rejected",
          message: `Comment failed to post (${action.payload})`,
        },
      };
    }
  }
  return state;
};

export default reducer;
