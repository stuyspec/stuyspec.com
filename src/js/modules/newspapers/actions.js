import axios from "axios";
import { STUY_SPEC_API_URL, STUY_SPEC_API_HEADERS } from "../../constants";
import * as t from "./actionTypes";

export const fetchNewspapers = dispatch => {
  return dispatch => {
    dispatch({ type: t.FETCH_NEWSPAPERS_PENDING });
    axios.get(`${STUY_SPEC_API_URL}/newspapers`, STUY_SPEC_API_HEADERS)
      .then(response => {
        dispatch({
          type: t.FETCH_NEWSPAPERS_FULFILLED,
          payload: response.data,
        });
      })
      .catch(err => {
        dispatch({
          type: t.FETCH_NEWSPAPERS_REJECTED,
          payload: err,
        });
      })
  }
};