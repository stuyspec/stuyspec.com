import { FETCH_INIT_DATA_FULFILLED } from '../core/actionTypes';

const initialState = {
  media: {},
};

const reducer = (state = { ...initialState }, action) => {
  switch (action.type) {
    case FETCH_INIT_DATA_FULFILLED: {
      return {
        ...state,
        media: action.payload.media.reduce((acc, medium) => {
          acc[medium.id] = medium;
          return acc;
        }, {}),
      };
    }
  }
  return state;
};

export default reducer;
