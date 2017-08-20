import {
  FETCH_MEDIA_PENDING,
  FETCH_MEDIA_FULFILLED,
  FETCH_MEDIA_REJECTED,
  ADD_MEDIA,
} from './actionTypes';

const initialState = {
  isFetching: false,
  isFetched: false,
  error: null,
  media: {},
  response: {},
};

const reducer = (state = { ...initialState }, action) => {
  switch (action.type) {
    case FETCH_MEDIA_PENDING: {
      return { ...state, isFetching: true, };
    }
    case FETCH_MEDIA_FULFILLED: {
      return {
        ...state,
        isFetching: false,
        response: action.payload,
      };
    }
    case FETCH_MEDIA_REJECTED: {
      return {
        ...state,
        isFetching: false,
        error: action.payload,
      };
    }
    case ADD_MEDIA: {
      return {
        ...state,
        media: {
          ...state.media,
          ...action.payload,
        },
        response: {},
        isFetched: true,
      };
    }
  }
  return state;
};

export default reducer;