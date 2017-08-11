import {
  FETCH_ARTICLE_PENDING,
  FETCH_ARTICLE_REJECTED,
  FETCH_ARTICLE_FULFILLED,
  ADD_ARTICLES,
  ADD_AUTHORSHIPS
} from './actionTypes';
import { MATCH_MEDIA } from "../media/actionTypes";

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
    case MATCH_MEDIA: {
      return {
        ...state,
        articles : {
          ...state.articles,
          ...action.payload
        },
      }
    }
  }
  return state;
};

export default reducer;