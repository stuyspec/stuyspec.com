import axios from 'axios';
import * as t from './actionTypes';
import STUY_SPEC_API from '../../constants';

//TODO: need a way to call the fetch function
export const fetch = () => {
  return (dispatch, getState) => {
    dispatch({ type: t.FETCH_ARTICLE_PENDING });
    //axios.get(apiUrl, {'headers': {'X-Key-Inflection': 'camel'}}) TODO: wait until Nic uses olive branch
    axios.get(STUY_SPEC_API+'/articles')
      .then((response) => {
        // This current code will dispatch the FETCH_ARTICLE_REJECtED because the API still has null values
        if (articleIsValid(response.data)) {
          dispatch({
            type: t.FETCH_ARTICLE_FULFILLED,
            payload: response.data,
          })
        } else {
          dispatch({
            type: t.FETCH_ARTICLE_REJECTED,
            payload: 'Invalid article array'
          })
        }
      })
      .catch((err) => {
        dispatch({
          type: t.FETCH_ARTICLE_REJECTED,
          payload: err
        })
      })
  };
};
const keyIsValid = (articleObject, key, type) => (
  key in articleObject) && (typeof (articleObjecty[ key ]) === type
);
const articleIsValid = (articleArray) => {
  const integerProperties = [ 'id', 'volume', 'issue', 'section_id' ];
  const stringProperties = [ 'title', 'slug', 'content', "created_at", "updated_at" ];
  const booleanProperties = [ 'is_draft' ];
  if (!Array.isArray(articleArray)) {
    return false;
  }
  articleArray.forEach((articleObject) => {
    integerProperties.forEach((numberKey) => (
      keyIsValid(articleObject, numberKey, 'number')
    ));
    stringProperties.forEach((stringKey) => (
      keyIsValid(articleObject, stringKey, 'string')
    ));
    booleanProperties.forEach((booleanKey) => (
      keyIsValid(articleObject, booleanKey, 'boolean')
    ));
  })
  return true;
};