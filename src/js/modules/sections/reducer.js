import {
  FETCH_SECTIONS_PENDING,
  FETCH_SECTIONS_FULFILLED,
  FETCH_SECTIONS_REJECTED,
} from "./actionTypes";
import { getSectionsWithPermalinks } from "./selectors";

const initialState = {
  isFetching: false,
  isFetched: false,
  error: null,
  sections: {},
};

const addPermalinksToSections = sections => {
  return Object.values(sections).reduce((acc, section) => {
    let permalink = "/" + section.slug;
    while (section.parentId !== null) {
      section = sections[section.parentId];
      permalink = "/" + section.slug + permalink;
    }
    acc[section.id] = {
      ...section,
      permalink,
    };
    return acc;
  }, {});
};

const reducer = (state = { ...initialState }, action) => {
  switch (action.type) {
    case FETCH_SECTIONS_PENDING: {
      return { ...state, isFetching: true, error: null };
    }
    case FETCH_SECTIONS_FULFILLED: {
      return {
        ...state,
        isFetching: false,
        isFetched: true,
        sections: addPermalinksToSections(action.payload),
      };
    }
    case FETCH_SECTIONS_REJECTED: {
      return { ...state, isFetching: false, error: action.payload };
    }
  }
  return state;
};

export default reducer;
