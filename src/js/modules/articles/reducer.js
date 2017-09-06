import {
  FETCH_ARTICLES_PENDING,
  FETCH_ARTICLES_FULFILLED,
  FETCH_ARTICLES_REJECTED,
  FETCH_AUTHORSHIPS_FULFILLED,
} from "./actionTypes";

import { isObjectEmpty } from "../../utils";

const initialState = {
  isFetching: false,
  isFetched: false,
  error: null,
  articles: {},
  authorships: [],
};

const reducer = (state = { ...initialState }, action) => {
  switch (action.type) {
    case FETCH_ARTICLES_PENDING: {
      return { ...state, isFetching: true };
    }
    case FETCH_ARTICLES_FULFILLED: {
      const newArticles = action.payload.reduce((acc, article) => {
        acc[article.id] = article;
        return acc;
      }, {});
      return {
        ...state,
        isFetching: false,
        isFetched: state.authorships.length !== 0,
        articles: newArticles,
      };
    }
    case FETCH_ARTICLES_REJECTED: {
      return {
        ...state,
        isFetching: false,
        error: action.payload,
      };
    }
    case FETCH_AUTHORSHIPS_FULFILLED: {
      return {
        ...state,
        isFetched: !isObjectEmpty(state.articles),
        authorships: action.payload,
      };
    }
  }
  return state;
};

export default reducer;
