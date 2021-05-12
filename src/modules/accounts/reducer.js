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
  OPEN_SUBSCRIPTION_MODAL,
  CLOSE_SUBSCRIPTION_MODAL,
  CREATE_SESSION,
  VALIDATE_TOKEN_REJECTED,
  CREATE_SUBSCRIBER_PENDING,
  CREATE_SUBSCRIBER_FULFILLED,
  CREATE_SUBSCRIBER_REJECTED,
} from "./actionTypes";

const initialState = {
  status: {
    errors: [],
    message: null,
    formName: null,
  },
  isSignInModalOpen: false,
  session: null,
  isSubscriptionModalOpen: false,
};

const reducer = (state = { ...initialState }, action) => {
  switch (action.type) {
    case SIGN_IN_PENDING:
    case SIGN_UP_PENDING:
    case SIGN_OUT_PENDING:
    case CREATE_SUBSCRIBER_PENDING:
    case UPDATE_USER_PENDING: {
      return {
        ...state,
        status: {
          errors: [],
          message: null,
          formName: null,
        },
      };
    }
    case SIGN_IN_FULFILLED: {
      localStorage.setItem("session", JSON.stringify(action.payload.headers));
      return {
        ...state,
        session: action.payload.headers,
        status: {
          errors: [],
          formName: "signIn",
          message: "Successfully signed in.",
        },
      };
    }
    case SIGN_IN_REJECTED: {
      return {
        ...state,
        status: {
          errors: (action.payload.response &&
            action.payload.response.data.errors) || [action.payload.message],
          formName: "signIn",
          message: null,
        },
      };
    }

    case SIGN_UP_FULFILLED: {
      return {
        ...state,
        status: {
          errors: [],
          formName: "signUp",
          message:
            "Welcome! You can confirm your account through the link sent to the email you signed up with.",
        },
      };

    }
    case SIGN_UP_REJECTED: {
      return {
        ...state,
        status: {
          errors: (action.payload.response &&
            action.payload.response.data.errors.fullMessages) || [
            action.payload.message,
          ],
          formName: "signUp",
          message: null,
        },
      };
    }

    case SIGN_OUT_FULFILLED: {
      localStorage.removeItem("session");
      return {
        ...state,
        status: {
          errors: [],
          message: "You have successfully signed out.",
          formName: "signOut",
        },
        session: null,
      };
    }
    case SIGN_OUT_REJECTED: {
      return {
        ...state,
        status: {
          errors: (action.payload.response &&
            action.payload.response.data.errors) || [action.payload.message],
          message: null,
          formName: "signOut",
        },
      };
    }

    case CREATE_SUBSCRIBER_FULFILLED: {
      return {
        ...state,
        status: {
          errors: [],
          message: "You have successfully subscribed to our newsletter.",
          formName: "subscription",
        },
      };
    }
    case CREATE_SUBSCRIBER_REJECTED: {
      let errors = (action.payload.response &&
        action.payload.response.data.errors) || [action.payload.message];
      if (action.payload.response.status === 422) {
        errors = ["You are already subscribed."];
      }
      return {
        ...state,
        status: {
          errors,
          message: null,
          formName: "subscription",
        },
      };
    }

    case UPDATE_USER_FULFILLED: {
      return {
        ...state,
        status: {
          errors: [],
          message: "Your information has been updated.",
          formName: "editUser",
        },
      };
    }
    case UPDATE_USER_REJECTED: {
      return {
        ...state,
        status: {
          errors: (action.payload.response &&
            action.payload.response.data.errors) || [action.payload.message],
          message: null,
          formName: "editUser",
        },
      };
    }

    case OPEN_SIGN_IN_MODAL: {
      return { ...state, isSignInModalOpen: true };
    }
    case CLOSE_SIGN_IN_MODAL: {
      return { ...state, isSignInModalOpen: false };
    }

    case OPEN_SUBSCRIPTION_MODAL: {
      return { ...state, isSubscriptionModalOpen: true };
    }
    case CLOSE_SUBSCRIPTION_MODAL: {
      return { ...state, isSubscriptionModalOpen: false };
    }

    case CREATE_SESSION: {
      return { ...state, session: action.payload };
    }

    case VALIDATE_TOKEN_REJECTED: {
      localStorage.removeItem("session");
      return {
        ...state,
        session: null,
      };
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

    default: {
        return state;
    }
  }
};

export default reducer;
