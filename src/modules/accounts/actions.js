import axios from 'axios';
import { reset } from 'redux-form';
import appHistory from '../../tools/appHistory';

import * as t from './actionTypes';
import { CREATE_USER_FULFILLED } from '../users/actionTypes';
import { STUY_SPEC_API_URL, STUY_SPEC_API_HEADERS } from '../../constants';
import { delay } from '../../utils';

export const signUp = registrationParams => dispatch => {
  dispatch({
    type: t.SIGN_UP_PENDING,
    payload: registrationParams,
  });

  /* As Devise only accepts email/passwords, we need a separate update
     * for other user properties. Note that we are not simply dispatching
     * an UPDATE_USER because that will change the form name in the status
     * of the accounts state slice to editUser, which will prevent success
     * text from rendering on the signUpForm.
     */
  const deviseParams = (({ email, password, passwordConfirmation }) => ({
    email,
    password,
    passwordConfirmation,
  }))(registrationParams);
  const additionalParams = (({ firstName, lastName }) => ({
    firstName,
    lastName,
  }))(registrationParams);

  axios
    .post(`${STUY_SPEC_API_URL}/auth`, deviseParams, STUY_SPEC_API_HEADERS)
    .then(response => {
      dispatch({
        type: t.SIGN_UP_FULFILLED,
        payload: response,
      });
      return response.data.data.id;
    })
    .then(userId => axios.put(
      `${STUY_SPEC_API_URL}/users/${userId}`,
      additionalParams,
      STUY_SPEC_API_HEADERS,
    ))
    .then(response => {
      dispatch({
        type: CREATE_USER_FULFILLED,
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

export const signIn = (signInParams, isInModal) => dispatch => {
  dispatch({
    type: t.SIGN_IN_PENDING,
    payload: signInParams,
  });
  axios
    .post(
      `${STUY_SPEC_API_URL}/auth/sign_in`,
      signInParams,
      STUY_SPEC_API_HEADERS,
    )
    .then(response => {
      dispatch({
        type: t.SIGN_IN_FULFILLED,
        payload: response,
      });
      if (isInModal !== true) {
        appHistory.push('/myaccount/profile');
      }
    })
    .catch(err => {
      dispatch({
        type: t.SIGN_IN_REJECTED,
        payload: err,
      });
    });
};

export const signOut = session => dispatch => {
  dispatch({ type: t.SIGN_OUT_PENDING, payload: session });
  axios
    .delete(`${STUY_SPEC_API_URL}/auth/sign_out`, { headers: session })
    .then(() => {
      dispatch({
        type: t.SIGN_OUT_FULFILLED,
      });
      appHistory.push('/');
    })
    .catch(err => {
      dispatch({
        type: t.SIGN_OUT_REJECTED,
        payload: err,
      });
    });
};

export const updateUser = (userParams, id) => dispatch => {
  dispatch({
    type: t.UPDATE_USER_PENDING,
    payload: userParams,
  });
  axios
    .put(
      `${STUY_SPEC_API_URL}/users/${id}`,
      userParams,
      STUY_SPEC_API_HEADERS,
    )
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

export const openSignInModal = () => ({
  type: t.OPEN_SIGN_IN_MODAL,
});

export const closeSignInModal = () => ({
  type: t.CLOSE_SIGN_IN_MODAL,
});

export const openSubscriptionModal = () => ({
  type: t.OPEN_SUBSCRIPTION_MODAL,
});

export const closeSubscriptionModal = () => ({
  type: t.CLOSE_SUBSCRIPTION_MODAL,
});

export const subscribe = values => dispatch => {
  dispatch({
    type: t.CREATE_SUBSCRIBER_PENDING,
    payload: values,
  });
  axios
    .post(`${STUY_SPEC_API_URL}/subscribers`, values, STUY_SPEC_API_HEADERS)
    .then(response => {
      dispatch({
        type: t.CREATE_SUBSCRIBER_FULFILLED,
        payload: response,
      });
    })
  // Lets the user glance at the confirmation message
    .then(delay(500))
    .then(() => {
      dispatch({ type: t.CLOSE_SUBSCRIPTION_MODAL });

      // Destroys the inputs in the form Subscription
      dispatch(reset('Subscription'));
    })
    .catch(err => {
      dispatch({
        type: t.CREATE_SUBSCRIBER_REJECTED,
        payload: err,
      });
    });
};

export const validateToken = session => {
  if (!session) {
    return false;
  }

  // If a session exists, we need to check if it is still valid.
  return dispatch => {
    axios
      .get(`${STUY_SPEC_API_URL}/auth/validate_token`, {
        headers: {
          'access-token': session['access-token'],
          client: session.client,
          uid: session.uid,
        },
      })
      .then(response => {
        dispatch({
          type: t.VALIDATE_TOKEN_FULFILLED,
          payload: response,
        });
      })
      .catch(() => {
        dispatch({
          type: t.VALIDATE_TOKEN_REJECTED,
        });
      });
  };
};

export const createSession = session => dispatch => {
  dispatch({
    type: t.CREATE_SESSION,
    payload: session,
  });
  dispatch(validateToken(session));
};
