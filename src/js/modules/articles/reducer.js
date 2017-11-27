import {
  SEARCH_ARTICLES_PENDING,
  SEARCH_ARTICLES_FULFILLED,
  SEARCH_ARTICLES_REJECTED,
} from "./actionTypes";
import {
  FETCH_INIT_DATA_FULFILLED
} from "../core/actionTypes";
import { shortenSummary } from "../../utils";

const initialState = {
  isSearching: false,
  error: null,
  articles: {},
  authorships: [],
  searchableIds: [],
};

const reducer = (state = { ...initialState }, action) => {
  switch (action.type) {
    case FETCH_INIT_DATA_FULFILLED: {
      return {
        ...state,
        articles: action.payload.articles.reduce((acc, article) => {
          article["originalSummary"] = article["summary"];
          /* shortenSummary shortens the article summary to 25 words + "..."
           * Also creates a summary from article content if the article has
           * no summary.
           */
          article["summary"] = shortenSummary(article);
          acc[article.id] = article;
          return acc;
        }, {}),
        authorships: action.payload.authorships,
      }
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
