import {
  FETCH_ARTICLE_PENDING,
  FETCH_ARTICLE_REJECTED,
  FETCH_ARTICLE_FULFILLED,
  ADD_ARTICLES,
} from './actionTypes';

const initialState = {
  isFetching: false,
  isFetched: false,
  error: null,
  articles: {},
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
        responseData: {},
      }
    }
  }
  return state;
};

export default reducer;