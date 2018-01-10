import {
  SEARCH_ARTICLES_PENDING,
  SEARCH_ARTICLES_FULFILLED,
  SEARCH_ARTICLES_REJECTED,
} from "./actionTypes";

const initialState = {};

const reducer = (state = { ...initialState }, action) => {
  switch (action.type) {
    case SEARCH_ARTICLES_PENDING: {
      return { ...state, isSearching: true };
    }
    case SEARCH_ARTICLES_FULFILLED: {
      const searchableIds = action.payload.map(
        searchResult => searchResult.searchableId,
      );
      return {
        ...state,
        searchableIds: searchableIds,
        isSearching: false,
      };
    }
    case SEARCH_ARTICLES_REJECTED: {
      return {
        ...state,
        error: action.payload,
        isSearching: false,
      };
    }
  }
  return state;
};

export default reducer;
