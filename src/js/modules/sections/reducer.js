import {
  FETCH_SECTION_PENDING,
  FETCH_SECTION_REJECTED,
  FETCH_SECTION_FULFILLED,
} from './actionTypes';

const initialState = {
  isFetching: false,
  isFetched: false,
  error: null,
  request: null,
  sections: {
    "news": {
      id: 0,
      name: "News",
      slug: "news",
      description: "The news of Stuyvesant.",
      parentSlug: null,
    },
  },
};

const reducer = (state = { ...initialState }, action) => {
  switch (action.type) {
    case 'sections/FETCH_SECTION_PENDING': {
      return { ...state, isFetching: true };
    }
    case 'sections/FETCH_SECTION_REJECTED': {
      return { ...state, isFetching: false, error: action.payload };
    }
    case 'sections/FETCH_SECTION_FULFILLED': {
      return {
        ...state,
        isFetching: false,
        isFetched: true,
        request: action.payload
      };
    }
  }
  return state;
};

export default reducer;
