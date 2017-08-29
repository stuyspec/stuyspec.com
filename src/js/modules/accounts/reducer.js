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

  UPDATE_PASSWORD_PENDING,
  UPDATE_USER_FULFILLED,
  UPDATE_USER_REJECTED,
} from "./actionTypes";

const initialState = {
  status: {
    errors: [],
    message: null,
    form: null,
  },
  session: null,
};

const reducer = (state = { ...initialState }, action) => {
  switch (action.type) {
    case SIGN_IN_PENDING: {
      return {
        ...state,
        status: {
          errors: [],
          message: null,
          form: null,
        },
      };
    }
    case SIGN_IN_FULFILLED: {
      return { ...state, session: action.payload };
    }
    case SIGN_IN_REJECTED: {
      return {
        ...state,
        status: {
          errors: action.payload.response.data.errors,
          form: "signIn",
          message: null,
        },
      };
    }

    case SIGN_UP_PENDING: {
      return {
        ...state,
        status: {
          errors: [],
          form: null,
          message: null
        }
      }
    }
    case SIGN_UP_FULFILLED: {
      return {
        ...state,
        status: {
          errors: [],
          form: "signUp",
          message:
            "Welcome! You can confirm your account through the link sent to the email you signed up with.",
        },
      };
    }
    case SIGN_UP_REJECTED: {
      return {
        ...state,
        status: {
          errors: action.payload.response.data.errors.fullMessages,
          form: "signUp",
          message: null,
        },
      };
    }

    case SIGN_OUT_PENDING: {
      return {
        ...state,
        status: {
          errors: [],
          form: null,
          message: null,
        }
      }
    }
    case SIGN_OUT_FULFILLED: {
      return {
        ...state,
        status: {
          errors: [],
          message: "You have signed out.",
          form: "signOut",
        },
        session: null
      };
    }
    case SIGN_OUT_REJECTED: {
      return {
        ...state,
        status: {
          errors: action.payload.response.data.errors,
          message: null,
          form: "signOut",
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
