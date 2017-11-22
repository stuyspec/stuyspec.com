import {
  FETCH_SECTIONS_PENDING,
  FETCH_SECTIONS_FULFILLED,
  FETCH_SECTIONS_REJECTED,
} from "./actionTypes";
import { getSectionsWithPermalinks } from "./selectors";

/*
  TODO: Remove the hardcoded subsections once done
 */
const initialState = {
  isFetching: false,
  isFetched: false,
  error: null,
  sections: {},
};

const addPermalinksToSections = sections => {
  return Object.values(sections).reduce((acc, section) => {
    let permalink = "/" + section.slug;
    let upwardsTraversingSection = { ...section };
    while (upwardsTraversingSection.parentId) {
      upwardsTraversingSection =
        sections[upwardsTraversingSection.parentId - 1];
      permalink = "/" + upwardsTraversingSection.slug + permalink;
    }
    if (!"Art Photo".includes(section.name)) {
      acc[section.id] = {
        ...section,
        permalink,
      };
    }
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
        sections: {
          ...state.sections,
          ...addPermalinksToSections(action.payload),
        },
      };
    }
    case FETCH_SECTIONS_REJECTED: {
      return { ...state, isFetching: false, error: action.payload };
    }
  }
  return state;
};

export default reducer;
