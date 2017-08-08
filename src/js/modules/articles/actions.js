import axios from "axios";
import * as t from "./actionTypes";
import { STUY_SPEC_API, HEADER } from "../../constants";
import { getProcessedArticlesResponse, getFakeAuthorshipsForArticleResponse } from "./selectors";

export const fetchArticles = () => {
  return (dispatch, getState) => {
    dispatch({ type: t.FETCH_ARTICLE_PENDING });
    axios.get(`${STUY_SPEC_API}/articles`, { 'headers': HEADER })
      .then(response => {
        if (isArticleValid(response.data)) {
          dispatch({
            type: t.FETCH_ARTICLE_FULFILLED,
            payload: response.data,
          });
        }
      })
      .then(response => { // TODO: promise function orders are wonky without @param response
        dispatch({
          type: t.ADD_ARTICLES,
          payload: getProcessedArticlesResponse(getState()),
        });
      })
      .then(response => {
        dispatch({
          type: t.ADD_AUTHORSHIPS,
          payload: getFakeAuthorshipsForArticleResponse(getState()),
        })
      })
      .catch((err) => {
        dispatch({
          type: t.FETCH_ARTICLE_REJECTED,
          payload: err,
        })
      })
  };
};

const checkArticleKeyValidity = (articleObject, key, type) => {
  if (key in articleObject) {
    if (typeof (articleObject[ key ]) === type) {
      return true;
    } else {
      throw `EXCEPTION: key ${key} in articleObject is 
        ${typeof (articleObject[ key ])}, but should be ${type}.`;
    }
  } else {
    throw `EXCEPTION: key ${key} is undefined in articleObject.`;
  }
};

/*
TODO: Add volume and issue int props after non-null data seeded @nicholas
TODO: Add isDraft boolean prop after non-null data seeded @nicholas
TODO: Add boolean key validity after non-null data seeded @nicholas
 */
const isArticleValid = (articleArray) => {
  const integerProperties = [ 'id', 'sectionId' ];
  const stringProperties = [ 'title', 'slug', 'content', "createdAt", "updatedAt" ];
  if (!Array.isArray(articleArray)) {
    throw 'EXCEPTION: article response is not an array.'
  }
  articleArray.forEach(articleObject => {
    integerProperties.forEach(numberKey => {
      checkArticleKeyValidity(articleObject, numberKey, 'number');
    });
    stringProperties.forEach((stringKey) => {
      checkArticleKeyValidity(articleObject, stringKey, 'string');
    });
  });
  return true;
};

