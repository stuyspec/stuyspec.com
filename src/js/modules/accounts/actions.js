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
    axios
      .post(`${STUY_SPEC_API_URL}/auth`, values, STUY_SPEC_API_HEADERS)
      .then(response => {
        dispatch({
          type: t.SIGN_UP_FULFILLED,
          payload: response,
        });
        const user = response.data.data;
        axios
          .put(
            `${STUY_SPEC_API_URL}/users/${user.id}`,
            values,
            STUY_SPEC_API_HEADERS,
          )
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
    axios
      .post(`${STUY_SPEC_API_URL}/auth/sign_in`, values, STUY_SPEC_API_HEADERS)
      .then(response => {
        dispatch({
          type: t.SIGN_IN_FULFILLED,
          payload: response,
        });
        appHistory.push("/myaccount/profile");
      })
      .catch(err => {
        dispatch({
          type: t.SIGN_IN_REJECTED,
          payload: err,
        });
      });
  };
};

export const signOut = headers => {
  return dispatch => {
    dispatch({ type: t.SIGN_OUT_PENDING, payload: headers });
    axios
      .delete(`${STUY_SPEC_API_URL}/auth/sign_out`, { headers })
      .then(response => {
        console.log(response);
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
  };
};

export const updateUser = (values, id) => {
  return dispatch => {
    dispatch({
      type: t.UPDATE_USER_PENDING,
      payload: values,
    });
    axios
      .put(`${STUY_SPEC_API_URL}/users/${id}`, values, STUY_SPEC_API_HEADERS)
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
  };
};
