import { FETCH_INIT_DATA_FULFILLED } from '../core/actionTypes';
import { getSectionsWithPermalinks } from './selectors';

const initialState = {
  sections: {},
};

const addPermalinksToSections = sectionsArray => {
  const sections = sectionsArray.reduce((acc, section) => {
    acc[section.id] = section;
    return acc;
  }, {});
  return sectionsArray.reduce((acc, section) => {
    let permalink = '/' + section.slug;
    if (section.parentId) {
      permalink = '/' + sections[section.parentId].slug + permalink;
    }
    if (!'Art Photo'.includes(section.name)) {
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
    case FETCH_INIT_DATA_FULFILLED: {
      return {
        ...state,
        sections: addPermalinksToSections(action.payload.sections),
      };
    }
  }
  return state;
};

export default reducer;
