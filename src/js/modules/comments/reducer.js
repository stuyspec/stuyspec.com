import {
  CREATE_COMMENT_REJECTED,
  CREATE_COMMENT_FULFILLED,
  CREATE_COMMENT_PENDING,
  FETCH_COMMENTS_PENDING,
  FETCH_COMMENTS_FULFILLED,
  FETCH_COMMENTS_REJECTED,
  OPEN_LOGIN_MODAL,
  CLOSE_LOGIN_MODAL,
} from "./actionTypes";

const initialState = {
  error: null,
  isFetching: false,
  isFetched: true,
  isModalOpen: false,
  comments: {},
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
          acc[ comment.id ] = comment;
          return acc;
        }, {}),
      };
    }
    case FETCH_COMMENTS_REJECTED: {
      return { ...state, error: action.payload };
    }
    case CREATE_COMMENT_REJECTED: {
      return { error: action.payload };
    }
    case OPEN_LOGIN_MODAL: {
      return { ...state, isModalOpen: true };
    }
    case CLOSE_LOGIN_MODAL: {
      return { ...state, isModalOpen: false };
    }
  }
  return state;
};

export default reducer;