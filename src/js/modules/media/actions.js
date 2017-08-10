import axios from "axios";
import * as t from "./actionTypes";
import { STUY_SPEC_API, HEADER } from "../../constants"
import { getProcessedMediaResponse } from "./selectors";
import { checkKeyValidity} from "../../utils"

export const fetchMedia = () => {
  return (dispatch) => {
    dispatch({ type: t.FETCH_MEDIA_PENDING });
    axios.get(`${STUY_SPEC_API}/media`, { 'headers': HEADER })
      .then(response => {
        if (isMediaValid(response.data)) {
          dispatch({
            type: t.FETCH_MEDIA_FULFILLED,
            payload: response.data,
          });
        }
      })
      .then(response => {
        dispatch({
          type: t.ADD_MEDIA,
          payload: response.data,
        });
      })
      .catch((err) => {
        dispatch({
          type: t.FETCH_MEDIA_REJECTED,
          payload: err,
        })
      })
  };
};

const isMediaValid = (mediaArray) => {
  const integerProperties = [ 'id', 'userId', 'articleId' ];
  const stringProperties = [ 'url', 'title', 'caption', 'type' ];
  const booleanProperties = ['isFeatured'];
  if (!Array.isArray(mediaArray)) {
    throw 'EXCEPTION: media response is not an array.'
  }
  mediaArray.forEach(mediaObject => {
    integerProperties.forEach(numberKey => {
      checkKeyValidity(mediaObject, numberKey, 'number', 'media');
    });
    stringProperties.forEach((stringKey) => {
      checkKeyValidity(mediaObject, stringKey, 'string', 'media');
    });
    booleanProperties.forEach((booleanKey) => {
      checkKeyValidity(mediaObject, booleanKey, 'boolean', 'media');
    });
  });
  return true;
};