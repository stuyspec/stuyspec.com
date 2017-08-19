import axios from "axios";
import appHistory from "../../tools/appHistory";

import * as t from "./actionTypes";
import { STUY_SPEC_API_URL, STUY_SPEC_API_HEADER } from "../../constants";

// 'X-Key-Inflection': 'camel' will transform camelCase to snake_case

export const signUp = values => {
  return dispatch => {
    dispatch({
      type: t.SIGN_UP_PENDING,
      payload: values,
    });
    axios.post(`${STUY_SPEC_API_URL}/auth`, values, STUY_SPEC_API_HEADER)
      .then(response => {
        dispatch({
          type: t.SIGN_UP_FULFILLED,
          payload: response,
        });
      })
      .catch(err => {
        dispatch({
          type: t.SIGN_UP_REJECTED,
          payload: err,
        });
      });
  };
};

export const signIn = values => {
  return dispatch => {
    dispatch({
      type: t.SIGN_IN_PENDING,
      payload: values,
    });
    axios.post(`${STUY_SPEC_API_URL}/auth/sign_in`, values, STUY_SPEC_API_HEADER)
      .then(response => {
        dispatch({
          type: t.SIGN_IN_FULFILLED,
          payload: response,
        });
        appHistory.push('/myaccount/profile');
      })
      .catch(err => {
        dispatch({
          type: t.SIGN_IN_REJECTED,
          payload: err,
        });
      });
  }
}

export const signOut = values => {
  return dispatch => {
    dispatch({ type: t.SIGN_OUT_PENDING });
    axios.delete(`${STUY_SPEC_API_URL}/auth/sign_out`, values, STUY_SPEC_API_HEADER)
      .then(response => {
        dispatch({
          type: t.SIGN_OUT_FULFILLED,
          payload: response,
        });
      })
      .catch(err => {
        dispatch({
          type: t.SIGN_OUT_REJECTED,
          payload: err,
        });
      });
  }
}

export const updateUser = values => {
  return dispatch => {
    dispatch({ type: t.UPDATE_USER_PENDING });
    axios.put(`${STUY_SPEC_API_URL}/`, values, STUY_SPEC_API_HEADER)
      .then(response => {
        dispatch({
          type: t.UPDATE_USER_FULFILLED,
          payload: response,
        });
      })
      .catch(err => {
        dispatch({
          type: t.UPDATE_USER_REJECTED,
          payload: err,
        });
      });
  }
}