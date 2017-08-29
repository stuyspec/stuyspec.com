import {
  SIGN_IN_PENDING,
  SIGN_IN_FULFILLED,
  SIGN_IN_REJECTED,
  SIGN_UP_FULFILLED,
  SIGN_UP_REJECTED,
  SIGN_UP_PENDING,
  SIGN_OUT_PENDING,
  SIGN_OUT_FULFILLED,
  SIGN_OUT_REJECTED,
} from "./actionTypes";

const initialState = {
  signInStatus: {
    errors: [],
    message: null,
  },
  signUpStatus: {
    errors: [],
    message: null,
  },
  signOutStatus: {
    errors: [],
    message: null,
  },
  session: null,
};

const reducer = (state = { ...initialState }, action) => {
  switch (action.type) {
    case SIGN_IN_PENDING: {
      return {
        ...state,
        signInStatus: {
          errors: [],
          message: null,
        },
      };
    }
    case SIGN_IN_FULFILLED: {
      return { ...state, session: action.payload };
    }
    case SIGN_IN_REJECTED: {
      return {
        ...state,
        signInStatus: {
          errors: action.payload.response.data.errors,
          message: null,
        },
      };
    }
    case SIGN_UP_PENDING: {
      return {
        ...state,
        signUpStatus: {
          errors: [],
          message: null
        }
      }
    }
    case SIGN_UP_FULFILLED: {
      return {
        ...state,
        signUpStatus: {
          errors: [],
          message:
            "Welcome! You can confirm your account through the link sent to the email you signed up with.",
        },
      };
    }
    case SIGN_UP_REJECTED: {
      return {
        ...state,
        signUpStatus: {
          errors: action.payload.response.data.errors.fullMessages,
          message: null,
        },
      };
    }
    case SIGN_OUT_PENDING: {
      return {
        ...state,
        signOutStatus: {
          errors: [],
          message: null
        }
      }
    }
    case SIGN_OUT_FULFILLED: {
      return {
        ...state,
        signOutStatus: {
          errors: [],
          message: "You have signed out.",
        },
        session: null
      };
    }
    case SIGN_OUT_REJECTED: {
      return {
        ...state,
        signOutStatus: {
          errors: action.payload.response.data.errors,
          message: null,
        },
      };
    }
    case "@@redux-form/DESTROY": {
      return {
        ...initialState,
        session: state.session
      }
    }
  }
  return state;
};

export default reducer;
