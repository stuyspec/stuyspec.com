import {
  FETCH_USER_PENDING,
  FETCH_USER_REJECTED,
  FETCH_USER_FULFILLED,
} from './actionTypes';

const initialState = {
  isFetching: false,
  isFetched: false,
  error: null,
  request: null,
  users: {
  },
};

const reducer = (state = { ...initialState }, action) => {
  switch (action.type) {
    case FETCH_USER_PENDING: {
      return { ...state, isFetching: true };
    }
    case FETCH_USER_REJECTED: {
      return { ...state, isFetching: false, error: action.payload };
    }
    case FETCH_USER_FULFILLED: {
      return {
        ...state,
        isFetching: false,
        isFetched: true,
        request: action.payload,
      };
    }
  }
  return state;
};

export default reducer;
