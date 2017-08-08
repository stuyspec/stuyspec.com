import axios from "axios";
import * as t from "./actionTypes";
import { STUY_SPEC_API, HEADER } from "../../constants"
import { getProcessedMediaResponse } from "./selectors";

export const fetchMedia = () => {
  return (dispatch, getState) => {
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
          payload: getProcessedMediaResponse(getState()),
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

const checkMediaKeyValidity = (mediaObject, key, type) => {
  if (key in mediaObject) {
    if (typeof (mediaObject[ key ]) === type) {
      return true;
    } else {
      throw `EXCEPTION: key ${key} in mediaObject is 
        ${typeof (mediaObject[ key ])}, but should be ${type}.`;
    }
  } else {
    throw `EXCEPTION: key ${key} is undefined in mediaObject.`;
  }
};

const isMediaValid = (mediaArray) => {
  console.log('media')
};