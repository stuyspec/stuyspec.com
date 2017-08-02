import axios from 'axios';
import * as t from './actionTypes';
import { getSections } from '../sections/selectors';

const apiUrl = 'https://api.stuyspec.xyz/articles';

//TODO: need a way to call the fetch function
export const fetch = () => {
  return (dispatch, getState) => {
    dispatch({ type: t.FETCH_ARTICLE_PENDING });
    //axios.get(apiUrl, {'headers': {'X-Key-Inflection': 'camel'}}) TODO: wait until Nic uses olive branch
    axios.get(apiUrl)
      .then((info) => {
        console.log(info);
        // This current code will dispatch the FETCH_ARTICLE_REJECtED because the API still has null values
        if (articleValidator(info.data)) {
          const sections = getSections(getState());
          dispatch({
            type: t.FETCH_ARTICLE_FULFILLED,
            payload: info.data,
            sections: sections,
          })
        } else {
          dispatch({ type: t.FETCH_ARTICLE_REJECTED, payload: 'Invalid article array' })
        }
      })
      .catch((err) => {
        dispatch({ type: t.FETCH_ARTICLE_REJECTED, payload: err })
      })
  };
};
const keyValidator = (articleObject, key, type) => {
  if (key in articleObject) {
    return (typeof (articleObject[ key ]) === type );
  } else {
    return false;
  }
};
const articleValidator = (articleArray) => {
  const numberIDs = [ 'id', 'volume', 'issue', 'section_id' ];
  const stringIDs = [ 'title', 'slug', 'content', "created_at", "updated_at" ];
  const booleanIDs = [ 'is_draft' ];
  if (!Array.isArray(articleArray)) {
    return false;
  }
  for (articleIndex in articleArray) {
    const articleObject = articleArray[ articleIndex ];
    for (numberIndex in numberIDs) {
      const numberKey = numberIDs[ numberIndex ];
      if (!keyValidator(articleObject, numberKey, 'number')) {
        return false;
      }
    }
    for (stringIndex in stringIDs) {
      const stringKey = stringIDs[ stringIndex ];
      if (!keyValidator(articleObject, stringKey, 'string')) {
        return false;
      }
    }
    for (booleanIndex in booleanIDs) {
      const booleanKey = booleanIDs[ booleanIndex ];
      if (!keyValidator(articleObject, booleanKey, 'boolean')) {
        return false;
      }
    }
  }
  return true;
};