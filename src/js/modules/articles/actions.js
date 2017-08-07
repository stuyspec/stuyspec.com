import axios from 'axios';
import * as t from './actionTypes';
import { STUY_SPEC_API, HEADER } from '../../constants';
import { getProcessedArticleResponseData } from './selectors';

//TODO: need a way to call the fetch function
export const fetchArticles = () => {
  return (dispatch, getState) => {
    dispatch({ type: t.FETCH_ARTICLE_PENDING });
    axios.get(`${STUY_SPEC_API}/articles`, { 'headers': HEADER })
      .then(response => {
        if (isArticleValid(response.data)) {
          console.log("vallidd:",response.data);
          dispatch({
            type: t.FETCH_ARTICLE_FULFILLED,
            payload: response.data,
          });
        }
      })
      .then(response => { // TODO: promise function orders are wonky without response
        dispatch({
          type: t.ADD_ARTICLES,
          payload: getProcessedArticleResponseData(getState()),
        });
      })
      .catch((err) => {
        dispatch({
          type: t.FETCH_ARTICLE_REJECTED,
          payload: err,
        })
      })
  };
};
const isArticleKeyValid = (articleObject, key, type) => {
  if (key in articleObject) {
    if (typeof (articleObject[ key ]) === type) {
      return true;
    } else {
      throw `Error: The data type of the key ${key} is incorrect.`
    }
  } else {
    throw `Error: The key ${key} is missing in the article object.`
  }
};
const isArticleValid = (articleArray) => {
  //const integerProperties = [ 'id', 'volume', 'issue', 'sectionId' ];
  //TODO: Add this one ^^ back in once volume and issue are not null
  const integerProperties = [ 'id', 'sectionId' ];
  const stringProperties = [ 'title', 'slug', 'content', "createdAt", "updatedAt" ];
  //const booleanProperties = [ 'isDraft' ];
  //TODO: Add this one ^^ back in once isDraft is not null for some of the articles
  if (!Array.isArray(articleArray)) {
    throw 'Error: Response is not an array.'
  }
  articleArray.forEach((articleObject) => {
    integerProperties.forEach((numberKey) => {
      if (!isArticleKeyValid(articleObject, numberKey, 'number')) {
        throw 'Error: Key Error'
      }
    });
    stringProperties.forEach((stringKey) => {
      if (!isArticleKeyValid(articleObject, stringKey, 'string')) {
        throw 'Error: Key Error'
      }
    });
    /*
    booleanProperties.forEach((booleanKey) => {
      if (!isArticleKeyValid(articleObject, booleanKey, 'boolean')) {
        throw 'Error: Key Error'
      }
    });
    TODO: Add this back in once ALL the values of isDraft is not null
    */
  });
  return true;
};

