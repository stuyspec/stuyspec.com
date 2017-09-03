import {
  FETCH_ARTICLES_PENDING,
  FETCH_ARTICLES_FULFILLED,
  FETCH_ARTICLES_REJECTED,
  FETCH_AUTHORSHIPS_FULFILLED,
} from "./actionTypes";

import { getSections } from "../sections/selectors";

const initialState = {
  isFetching: false,
  areArticlesFetched: false,
  areAuthorshipsFetched: false,
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
        areArticlesFetched: true,
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
        areAuthorshipsFetched: true,
        authorships: action.payload,
      };
    }
  }
  return state;
};

export default reducer;
