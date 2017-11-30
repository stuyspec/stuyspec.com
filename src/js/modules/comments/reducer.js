import {
  CREATE_COMMENT_FULFILLED,
  CREATE_COMMENT_REJECTED,
} from "./actionTypes";
import { FETCH_INIT_DATA_FULFILLED } from "../core/actionTypes";

const initialState = {
  comments: {},
  status: {
    type: null,
    message: null,
  },
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_INIT_DATA_FULFILLED: {
      return {
        ...state,
        comments: action.payload.comments.reduce((acc, comment) => {
          acc[comment.id] = comment;
          return acc;
        }, {}),
      };
    }
    case CREATE_COMMENT_FULFILLED: {
      return {
        ...state,
        status: {
          type: "fulfilled",
          message: `Comment submitted for review at ${action.payload.data
            .createdAt}`,
        },
      };
    }
    case CREATE_COMMENT_REJECTED: {
      return {
        ...state,
        status: {
          type: "rejected",
          message: `Comment failed to post (${action.payload})`,
        },
      };
    }

    case "@@redux-form/DESTROY": {
      // Clears status data so the success message will not appear on other
      // articles' comment threads.
      return {
        ...initialState,
        comments: state.comments,
      };
    }
  }
  return state;
};

export default reducer;
