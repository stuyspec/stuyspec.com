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
  UPDATE_USER_FULFILLED,
  UPDATE_USER_REJECTED,
  UPDATE_USER_PENDING,
  OPEN_SIGN_IN_MODAL,
  CLOSE_SIGN_IN_MODAL,
} from "./actionTypes";

const initialState = {
  status: {
    errors: [],
    message: null,
    form: null,
  },
  isSignInModalOpen: false,
  session: {
    user: null,
    headers: null,
  },
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
      return {
        ...state,
        session: {
          user: action.payload.data.data,
          headers: action.payload.headers,
        },
        status: {
          errors: [],
          form: "signIn",
          message: "Successfully signed in.",
        },
      };
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
          message: null,
        },
      };
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
        },
      };
    }
    case SIGN_OUT_FULFILLED: {
      return {
        ...state,
        status: {
          errors: [],
          message: "You have been successfully signed out.",
          form: "signOut",
        },
        session: {
          user: null,
          headers: null,
        },
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

    case UPDATE_USER_PENDING: {
      return {
        ...state,
        status: {
          errors: [],
          message: null,
          form: null,
        },
      };
    }
    case UPDATE_USER_FULFILLED: {
      return {
        ...state,
        session: {
          user: action.payload.data,
          headers: state.session.headers, // headers remain the same
        },
        status: {
          errors: [],
          message: "Your changes have been saved.",
          form: "editUser",
        },
      };
    }
    case UPDATE_USER_REJECTED: {
      return {
        ...state,
        status: {
          errors: action.payload.response.data.errors,
          message: null,
          form: "editUser",
        },
      };
    }

    case OPEN_SIGN_IN_MODAL: {
      return { ...state, isSignInModalOpen: true };
    }
    case CLOSE_SIGN_IN_MODAL: {
      return { ...state, isSignInModalOpen: false };
    }

    case "@@redux-form/DESTROY": {
      if (action.meta.form.includes("signOut")) {
        return state;
      }
      return {
        ...initialState,
        session: state.session,
      };
    }
  }
  return state;
};

export default reducer;
