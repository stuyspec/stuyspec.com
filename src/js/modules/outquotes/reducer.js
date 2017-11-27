import {
  FETCH_INIT_DATA_FULFILLED
} from "../core/actionTypes";

const initialState = {
  outquotes: {},
};

const reducer = (state = { ...initialState }, action) => {
  switch (action.type) {
    case FETCH_INIT_DATA_FULFILLED: {
      return {
        ...state,
        outquotes: action.payload.outquotes.reduce((acc, outquote) => {
          acc[outquote.id] = outquote;
          return acc;
        }, {}),
      }
    }
  }
  return state;
};

export default reducer;
