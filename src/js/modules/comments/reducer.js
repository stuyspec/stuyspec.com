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
      id: 1,
      userId: 1,
      articleId: 11,
      content: "I wished that this article was written better!"
    },
  },
  replies: {
    0: {
      id: 0,
      userId: 3,
      commentId: 0,
      content: "Same, it made me realize how amazing the world is."
    },
    1: {
      id: 1,
      userId: 0,
      commentId: 1,
      content: "I believe that this article was perfectly fine."
    },
  }
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
    case '@@router/LOCATION_CHANGE': {
      return {...state, commentText: ''};
    }
  }
  return state;
};

export default reducer;