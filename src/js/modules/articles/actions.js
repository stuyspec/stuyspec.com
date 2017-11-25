import axios from "axios";
import { STUY_SPEC_API_URL, STUY_SPEC_API_HEADERS } from "../../constants";
import { validateKey } from "../../utils";
import * as t from "./actionTypes";
import { reset } from "redux-form";

export const searchArticles = query => {
  query = query.search;
  return dispatch => {
    console.log("dispatching");
    dispatch({ type: t.SEARCH_ARTICLES_PENDING });
    axios
      .get(`${STUY_SPEC_API_URL}/articles?query=${encodeURI(query)}`, STUY_SPEC_API_HEADERS)
      .then(response => {
        dispatch({
          type: t.SEARCH_ARTICLES_FULFILLED,
          payload: response.data,
        });
        dispatch(reset("search"));
      })
      .catch(err => {
        dispatch({
          type: t.SEARCH_ARTICLES_REJECTED,
          payload: err,
        });
      });
  };
};

export const fetchArticles = () => {
  return dispatch => {
    dispatch({ type: t.FETCH_ARTICLES_PENDING });
    axios
      .get(`${STUY_SPEC_API_URL}/articles`, STUY_SPEC_API_HEADERS)
      .then(response => {
        validateArticles(response.data);
        dispatch({
          type: t.FETCH_ARTICLES_FULFILLED,
          payload: response.data,
        });
      })
      .catch(err => {
        dispatch({
          type: t.FETCH_ARTICLES_REJECTED,
          payload: err,
        });
      });
  };
};

export const fetchAuthorships = () => {
  return dispatch => {
    dispatch({ type: t.FETCH_AUTHORSHIPS_PENDING });
    axios
      .get(`${STUY_SPEC_API_URL}/authorships`, STUY_SPEC_API_HEADERS)
      .then(response => {
        dispatch({
          type: t.FETCH_AUTHORSHIPS_FULFILLED,
          payload: response.data,
        });
      })
      .catch(err => {
        dispatch({
          type: t.FETCH_AUTHORSHIPS_REJECTED,
          payload: err,
        });
      });
  };
};

const validateArticles = articleArray => {
  const integerProperties = ["id", "volume", "issue", "sectionId"];
  const stringProperties = [
    "title",
    "slug",
    "content",
    "createdAt",
    "updatedAt",
  ];
  if (!Array.isArray(articleArray)) {
    throw "EXCEPTION: article response is not an array.";
  }
  articleArray.forEach(article => {
    integerProperties.forEach(numberKey => {
      validateKey(article, numberKey, "number", "article");
    });
    stringProperties.forEach(stringKey => {
      validateKey(article, stringKey, "string", "article");
    });
    validateKey(article, "isPublished", "boolean", "article");
  });
  return true;
};
