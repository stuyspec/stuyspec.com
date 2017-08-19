import {
  SIGN_IN_FULFILLED,
  SIGN_IN_REJECTED,
  SIGN_UP_FULFILLED,
  SIGN_UP_REJECTED,
  SIGN_OUT_FULFILLED,
} from './actionTypes';

const initialState = {
  signInErrors: [],
  signUpErrors: [],
  session: null,
};

const reducer = (state = { ...initialState }, action) => {
  switch (action.type) {
    case SIGN_IN_REJECTED: {
      return {
        ...state,
        signInErrors: action.payload.response.data.errors,
      }
    }
    case SIGN_IN_FULFILLED: {
      return {
        ...state,
        signInErrors: [],
        session: action.payload
      }
    }
    case SIGN_UP_REJECTED: {
      return {
        ...state,
        signUpErrors: action.payload.response.data.errors.full_messages,
      }
    }
    case SIGN_UP_FULFILLED: {
      return {
        ...state,
        signUpErrors: [],
        session: action.payload
      }
    }
    case SIGN_OUT_FULFILLED: {
      return {
        ...state,
        session: null,
      }
    }
  }
  return state;
};

export default reducer;