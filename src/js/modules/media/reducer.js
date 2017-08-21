import {
  FETCH_MEDIA_PENDING,
  FETCH_MEDIA_FULFILLED,
  FETCH_MEDIA_REJECTED,
} from "./actionTypes";

const initialState = {
  isFetching: false,
  isFetched: false,
  error: null,
  media: {},
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
        isFetched: true,
        // replacing acc with state.media will block component updates
        media: {
          ...state.media,
          ...action.payload.reduce((acc, mediaObject) => {
            acc[ mediaObject.id ] = mediaObject;
            return acc;
          }, {}),
        },
      };
    }
    case FETCH_MEDIA_REJECTED: {
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