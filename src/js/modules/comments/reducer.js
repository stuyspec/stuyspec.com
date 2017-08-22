import {
  EXPAND_TEXTBOX,
  SHRINK_TEXTBOX,
  TOGGLE_LOG_IN,
  UPDATE_COMMENT,
} from './actionTypes';

const initialState = {
  isFetching: false,
  isFetched: false,
  error: null,
  isExpanded: false,
  isUserLoggedIn: false,
  commentText: '',
  comments: {
    0: {
      id: 0,
      userId: 2,
      articleId: 11,
      content: "This article changed my life!"
    },
    1: {

    },
  },
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case EXPAND_TEXTBOX: {
      return {...state, isExpanded: true};
    }
    case SHRINK_TEXTBOX: {
      return {...state, isExpanded: false};
    }
    case TOGGLE_LOG_IN: {
      return {...state, isUserLoggedIn: !state.isUserLoggedIn};
    }
    case UPDATE_COMMENT: {
      return {...state, commentText: action.payload};
    }
  }
  return state;
};

export default reducer;