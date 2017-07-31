import axios from 'axios';
import * as t from './actionTypes';
import { FETCH_ARTICLE_FULFILLED } from "./actionTypes";
import { FETCH_ARTICLE_REJECTED } from "./actionTypes";
import { TEST } from "./actionTypes";

const apiUrl = 'http://api.icndb.com/jokes/random';

const keyValidator = (articleObject, key, type) => {
  if (key in articleObject) {
    return (typeof (articleObject[key]) == type );
  } else {
    return false;
  }
};

const articleValidator = (articleArray) => {
  const numberIDs = ['id', 'volume', 'issue'];
  const stringIDs = ['title', 'slug', 'content', 'date', 'time', 'sectionSlug'];
  for (articleIndex in articleArray) {
    const articleObject = articleArray[articleIndex];
    for (numberIndex in numberIDs) {
      const numberKey = numberIDs[numberIndex];
      if (!keyValidator(articleObject, numberKey, 'number')) {
        return false;
      }
    }
    for (stringIndex in stringIDs) {
      const stringKey = stringIDs[stringIndex];
      if (!keyValidator(articleObject, stringKey, 'string')) {
        return false;
      }
    }
  }
  return true;
};

//TODO: Get the correct URL from Nic and adjust the stringIDs and numberIDs

//TODO: Need correct ID to test axios and also need a way to call the fetch function
export const fetch = () => {
  return (dispatch) => {
    dispatch({type:FETCH_ARTICLE_PENDING});
    axios.get(apiUrl)
      .then((data) => {
        if (articleValidator(data)) {
          dispatch({ type: FETCH_ARTICLE_FULFILLED, payload: data, })
        } else {
          dispatch ({type: FETCH_ARTICLE_REJECTED, payload: 'Invalid article array'})
        }
      })
      .catch((err) => {
        dispatch({type:FETCH_ARTICLE_REJECTED, payload:err})
      })
  };
};