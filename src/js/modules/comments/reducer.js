import {
  POST_COMMENT_REJECTED,
  POST_COMMENT_FULFILLED,
  POST_COMMENT_PENDING,
} from './actionTypes';

const initialState = {
  isPosting: false,
  isPosted: false,
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
    2: {
      id: 2,
      userId: 2,
      articleId: 11,
      content: "But if he wants to build the wall, he also promised another country would pay for it. So stop asking Congress for money from Americans. And if he shuts down the government, I mean, isn't he the head of that government? “I’m going to close my business until my competitors treat me better!” How is that even a threat?"
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
    2: {
      id: 2,
      userId: 1,
      commentId: 1,
      content: "He should be focused on economic upliftment for the jobless and discouraged. The Wall was a vote-getting mechanism, albeit a cynical one - not real workable economic policy. And he knows it."
    }
  },
  response: {}
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case "@@redux-form/FOCUS": {
      return {...state, isExpanded: true};
    }
    case POST_COMMENT_FULFILLED: {
      return {...state, isPosting: true, response: action.payload};
    }
    case POST_COMMENT_PENDING: {
      return {...state, isPosted: true, isPosting: false};
    }
    case POST_COMMENT_REJECTED: {
      return {...state, error: action.payload}
    }
  }
  return state;
};

export default reducer;