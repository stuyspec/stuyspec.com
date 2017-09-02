import {
  FETCH_ARTICLES_PENDING,
  FETCH_ARTICLES_FULFILLED,
  FETCH_ARTICLES_REJECTED,
  FETCH_AUTHORSHIPS_FULFILLED,
} from "./actionTypes";

import { getSections } from "../sections/selectors";

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
      const newArticles = getRecommendedArticles(action.payload, action.state);
      return {
        ...state,
        isFetching: false,
        isFetched: true,
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
        authorships: action.payload,
      };
    }
  }
  return state;
};

const getRecommendedArticles = (articles, state) => {
  const sections = getSections(state);
  const newArticlesArray = articles.sort((a, b) => {
    const firstArticleRank =
      1.5 * sections[a.sectionId].rank + a.rank + 5 * (a.volume + a.issue);
    const secondArticleRank =
      1.5 * sections[b.sectionId].rank + b.rank + 5 * (b.volume + b.issue);
    return firstArticleRank - secondArticleRank;
  });
  return newArticlesArray.reduce((acc, article) => {
    acc[article.id] = article;
    return acc;
  }, {});
};

export default reducer;
