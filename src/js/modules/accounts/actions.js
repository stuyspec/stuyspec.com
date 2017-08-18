import axios from "axios";
import * as t from "./actionTypes";
import { STUY_SPEC_API, STUY_SPEC_API_HEADER } from "../../constants";

export const createUser = values => {
  return dispatch => {
    dispatch({ type: t.CREATE_USER_PENDING });
    // 'X-Key-Inflection': 'camel' will transform camelCase to snake_case
    axios.post(`${STUY_SPEC_API}/auth`, values, STUY_SPEC_API_HEADER)
      .then(response => {
        dispatch({
          type: t.CREATE_USER_FULFILLED,
          payload: response
        });
      })
      .catch(err => {
        dispatch({
          type: t.CREATE_USER_REJECTED,
          payload: err
        });
      });
  };
};