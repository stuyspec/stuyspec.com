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
  articles: {},
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
          ...action.payload
        ],
        response: [],
        isFetched: true,
      }
    }
  }
  return state;
};

export default reducer;