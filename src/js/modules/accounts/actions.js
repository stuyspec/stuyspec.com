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
        /* As Devise only accepts email/passwords, we need a separate update
         * for other user properties. Note that we are not simply dispatching
         * an UPDATE_USER because that will change the status's current form
         * name to editUser, which will prevent success text from rendering
         * on the signUpForm.
         */
        axios.put(`${STUY_SPEC_API_URL}/users/${user.id}`, values, STUY_SPEC_API_HEADERS)
      })
      .catch(err => {
        dispatch({
          type: t.SIGN_UP_REJECTED,
          payload: err,
        });
      });
  };
};

export const signIn = (values, isInModal) => {
  console.log(isInModal);
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
        if (isInModal !== true) {
          appHistory.push("/myaccount/profile");
        }
      })
      .catch(err => {
        dispatch({
          type: t.SIGN_IN_REJECTED,
          payload: err,
        });
      });
  };
};

export const signOut = session => {
  const headers = {
      "access-token": session.headers["access-token"],
      client: session.headers.client,
      uid: session.headers.uid,
    };
  return dispatch => {
    dispatch({ type: t.SIGN_OUT_PENDING, payload: headers });
    axios
      .delete(`${STUY_SPEC_API_URL}/auth/sign_out`, { headers })
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

export const openSignInModal = () => ({
  type: t.OPEN_SIGN_IN_MODAL,
});

export const closeSignInModal = () => ({
  type: t.CLOSE_SIGN_IN_MODAL,
});