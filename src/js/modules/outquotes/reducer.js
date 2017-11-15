import {
  FETCH_OUTQUOTES_PENDING,
  FETCH_OUTQUOTES_FULFILLED,
  FETCH_OUTQUOTES_REJECTED,
} from "./actionTypes";

const initialState = {
  isFetching: false,
  isFetched: false,
  error: null,
  outquotes: {},
};

const reducer = (state = { ...initialState }, action) => {
  switch (action.type) {
    case FETCH_OUTQUOTES_PENDING: {
      return { ...state, isFetching: true };
    }
    case FETCH_OUTQUOTES_FULFILLED: {
      return {
        ...state,
        isFetching: false,
        isFetched: true,
        outquotes: action.payload.reduce((acc, outquoteObject) => {
          acc[outquoteObject.id] = outquoteObject;
          return acc;
        }, {}),
      };
    }
    case FETCH_OUTQUOTES_REJECTED: {
      return {
        ...state,
        isFetching: false,
        error: action.payload,
      };
    }
  }
  return state;
};

export default reducer;
