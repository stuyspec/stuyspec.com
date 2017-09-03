import {
  FETCH_NEWSPAPERS_PENDING,
  FETCH_NEWSPAPERS_FULFILLED,
  FETCH_NEWSPAPERS_REJECTED,
} from "./actionTypes";

const initialState = {
  isFetching: false,
  isFetched: true,
  newspapers: []
}

const reducer = (state = { ...initialState }, action) => {
  switch (action.type) {
    case FETCH_NEWSPAPERS_PENDING: {
      return {
        ...state,
        isFetching: true,
        isFetched: false,
      }
    }
    case FETCH_NEWSPAPERS_FULFILLED: {
      return {
        ...state,
        newspapers: action.payload,
        isFetching: false,
        isFetched: true
      };
    }
    case FETCH_NEWSPAPERS_REJECTED: {
      return {
        ...state,
        isFetching: false,
        isFetched: false,
      }
    }
  }
  return state;
}

export default reducer;