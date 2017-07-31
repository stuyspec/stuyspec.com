import { FETCH_ARTICLE_FULFILLED } from "../modules/articles/actionTypes";

export const fetchArticleValidator = (store) => (next) => (action) => {
  console.log('hi')
  if (action.type === FETCH_ARTICLE_FULFILLED) {
    console.log('action')
    return next(action);
  }
};
