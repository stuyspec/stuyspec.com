import {
  FETCH_ARTICLES_PENDING,
  FETCH_ARTICLES_FULFILLED,
  FETCH_ARTICLES_REJECTED,
  FETCH_AUTHORSHIPS_FULFILLED,
  SEARCH_ARTICLES_PENDING,
  SEARCH_ARTICLES_FULFILLED,
  SEARCH_ARTICLES_REJECTED,
} from "./actionTypes";

import { isObjectEmpty, shortenSummary } from "../../utils";

const initialState = {
  isFetching: false,
  isFetched: false,
  isSearching: false,
  error: null,
  articles: {},
  authorships: [],
  searchableIds: [],
};

const reducer = (state = { ...initialState }, action) => {
  switch (action.type) {
    case FETCH_ARTICLES_PENDING: {
      return { ...state, isFetching: true };
    }
    case FETCH_ARTICLES_FULFILLED: {
      const newArticles = action.payload.reduce((acc, article) => {
        article["originalSummary"] = article["summary"];
        article["summary"] = shortenSummary(article);
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
    case SEARCH_ARTICLES_PENDING: {
      return { ...state, isSearching: true };
    }
    case SEARCH_ARTICLES_FULFILLED: {
      const searchableIds = action.payload.map(searchResult => searchResult.searchableId);
      return {
        ...state,
        searchableIds: searchableIds,
      };
    }
    case SEARCH_ARTICLES_REJECTED: {
      return {
        ...state,
        error: action.payload,
      };
    }
  }
  return state;
};

export default reducer;
