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
  sections: {
    7: {
      createdAt: "2017-09-01T04:31:43.345Z",
      description: "Music is a great department!",
      id: 7,
      name: "Music",
      parentId: 1,
      permalink: "/news/music",
      rank: 1,
      slug: "music",
      updatedAt: "2017-09-01T04:31:43.345Z",
    },
    8: {
      createdAt: "2017-09-01T04:31:43.345Z",
      description: "Campaign Coverage is a great department!",
      id: 8,
      name: "Campaign Coverage",
      parentId: 1,
      permalink: "/news/campaign-coverage",
      rank: 1,
      slug: "campaign-coverage",
      updatedAt: "2017-09-01T04:31:43.345Z",
    },
    9: {
      createdAt: "2017-09-01T04:31:43.345Z",
      description: "Film is a great department!",
      id: 9,
      name: "Film",
      parentId: 1,
      permalink: "/news/film",
      rank: 1,
      slug: "film",
      updatedAt: "2017-09-01T04:31:43.345Z",
    },
    10: {
      createdAt: "2017-09-01T04:31:43.345Z",
      description: "Spooktator is a great department!",
      id: 10,
      name: "Spooktator",
      parentId: 1,
      permalink: "/news/spooktator",
      rank: 1,
      slug: "spooktator",
      updatedAt: "2017-09-01T04:31:43.345Z",
    },
  },
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
