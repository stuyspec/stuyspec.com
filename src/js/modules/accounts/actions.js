import axios from "axios";
import appHistory from "../../tools/appHistory";

import * as t from "./actionTypes";
import { STUY_SPEC_API_URL, STUY_SPEC_API_HEADERS } from "../../constants";

export const signUp = values => {
  return dispatch => {
    dispatch({
      type: t.SIGN_UP_PENDING,
      payload: values,
    });
    axios.post(`${STUY_SPEC_API_URL}/auth`, values, STUY_SPEC_API_HEADERS)
      .then(response => {
        dispatch({
          type: t.SIGN_UP_FULFILLED,
          payload: response,
        });
        const user = response.data.data;
        axios.put(`${STUY_SPEC_API_URL}/users/${user.id}`, values, STUY_SPEC_API_HEADERS)
          .then(response => {
            dispatch({
              type: t.UPDATE_USER_FULFILLED,
              payload: response,
            });
            dispatch({
              type: t.SIGN_UP_FULFILLED,
              payload: response,
            });
          })
          .catch(err => {
            dispatch({
              type: t.UPDATE_USER_REJECTED,
              payload: err,
            });
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
    axios.post(`${STUY_SPEC_API_URL}/auth/sign_in`, values, STUY_SPEC_API_HEADERS)
      .then(response => {
        console.log(response.headers);
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
};

export const signOut = values => {
  return dispatch => {
    dispatch({ type: t.SIGN_OUT_PENDING });
    axios.delete(`${STUY_SPEC_API_URL}/auth/sign_out`, values, STUY_SPEC_API_HEADERS)
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
};

export const updateUser = values => {
  return dispatch => {
    if (values.password) {
      dispatch({ type: t.UPDATE_PASSWORD_PENDING });
      axios.put(`${STUY_SPEC_API_URL}/password`, values, STUY_SPEC_API_HEADERS)
        .then(response => {
          dispatch({
            type: t.UPDATE_PASSWORD_FULFILLED,
            payload: response,
          });
        })
        .catch(err => {
          dispatch({
            type: t.UPDATE_PASSWORD_REJECTED,
            payload: err,
          });
        });
    }
    dispatch({ type: t.UPDATE_USER_PENDING });
    axios.put(`${STUY_SPEC_API_URL}/`, values, STUY_SPEC_API_HEADERS)
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
};