import dateFormat from 'dateformat';

import {
  CREATE_COMMENT_FULFILLED,
  CREATE_COMMENT_REJECTED,
} from './actionTypes';

const initialState = {
  status: {
    type: null,
    message: null,
  },
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case CREATE_COMMENT_FULFILLED: {
      const time = dateFormat(
        action.payload.data.createdAt,
        'shortTime',
      ).toLowerCase();
      // e.g. 5:46 pm

      return {
        ...state,
        status: {
          type: 'fulfilled',
          message: `Comment submitted for review at ${time}.`,
        },
      };
    }
    case CREATE_COMMENT_REJECTED: {
      return {
        ...state,
        status: {
          type: 'rejected',
          message: `Comment failed to post (${action.payload}).`,
        },
      };
    }

    case '@@redux-form/DESTROY': {
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
