import {
  FETCH_ARTICLE_PENDING,
  FETCH_ARTICLE_REJECTED,
  FETCH_ARTICLE_FULFILLED,
  ADD_ARTICLES,
  ADD_AUTHORSHIPS
} from './actionTypes';

const initialState = {
  isFetching: false,
  isFetched: false,
  error: null,
  articles: {
    'hello-there': {
      'content': '<p>Testing 123, hellow there.</p>',
      'createdAt': "2017-08-04T22:13:28.630Z",
      'id': 14,
      'isDraft': true,
      'issue': null,
      'volume': null,
      'sectionSlug': 'ae',
      'slug': 'hello-there',
      'title': "Hello There",
      'updatedAt': "2017-08-04T22:13:28.630Z",
    },
  },
  authorships: [],
  response: {},
};

const reducer = (state = { ...initialState }, action) => {
  switch (action.type) {
    case FETCH_ARTICLE_PENDING: {
      return { ...state, isFetching: true, };
    }
    case FETCH_ARTICLE_FULFILLED: {
      return {
        ...state,
        isFetching: false,
        isFetched: true,
        response: action.payload,
      };
    }
    case FETCH_ARTICLE_REJECTED: {
      return {
        ...state,
        isFetching: false,
        error: action.payload,
      };
    }
    case ADD_ARTICLES: {
      return {
        ...state,
        articles: {
          ...state.articles,
          ...action.payload
        },
      }
    }
    case ADD_AUTHORSHIPS: {
      return {
        ...state,
        authorships: [
          ...state.authorships,
          ...action.payload
        ],
        response: [],
      }
    }
  }
  return state;
};

export default reducer;