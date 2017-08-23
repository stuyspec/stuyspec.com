import {
  FETCH_ARTICLE_PENDING,
  FETCH_ARTICLE_FULFILLED,
  FETCH_ARTICLE_REJECTED,
  ADD_AUTHORSHIPS
} from "./actionTypes";

const initialState = {
  isFetching: false,
  isFetched: false,
  error: null,
  articles: {},
  authorships: [],
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
        /* Placing state.articles as the initial value will for some reason
         * inhibit components' updating with the articles state, which is why
         * the spread operator is required.
         */
        articles: {
          ...state.articles,
          ...action.payload.reduce((acc, article) => {
            acc[ article.id ] = article;
            return acc;
          }, {}),
        },
      };
    }
    case FETCH_ARTICLE_REJECTED: {
      return {
        ...state,
        isFetching: false,
        error: action.payload,
      };
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