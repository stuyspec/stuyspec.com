import {
  FETCH_ARTICLE_PENDING,
  FETCH_ARTICLE_REJECTED,
  FETCH_ARTICLE_FULFILLED,
} from './actionTypes';
import store from '../../store';

const initialState = {
  isFetching: false,
  isFetched: false,
  error: null,
  request: null,
  articles: {},
};

const reducer = (state = { ...initialState }, action) => {
  switch (action.type) {
    case FETCH_ARTICLE_PENDING: {
      return { ...state, isFetching: true, };
    }
    case FETCH_ARTICLE_FULFILLED: {
      return {
        ...state,
        isFetching: false,
        isFetched: true,
        // action.payload already tested in actions to be array
        articles: action.payload.reduce((acc, cur) => {
          const articleSlug = cur.slug;
          const sectionID = cur.section_id;
          delete cur.section_id;
          acc[ articleSlug ] = {
            ...cur,
            dateline: formatDate(cur.created_at),
            sectionSlug: slugFinder(sectionID, action),
          };
          return acc;
        }, { ...state.articles }),
      };
    }
    case FETCH_ARTICLE_REJECTED: {
      return {
        ...state,
        isFetching: false,
        error: action.payload,
      };
    }
  }
  return state;
};

const formatDate = (string) => {
  //Removes the Z at the end of the string which eliminates the need to offset the date
  const newString = string.slice(0, string.length - 1);
  //articleDateline and currentDate will be in the format:
  // Tue Aug 01 2017 20:08:54 GMT-0400 (EDT)
  const articleDateline = new Date(newString);
  const currentDate = new Date();
  //formattedDate is in the following format:
  //August 1, 2017, 8:08 PM
  const options = {
    year: "numeric", month: "long", day: "numeric",
    hour: "2-digit", minute: "2-digit"
  };
  const formattedDate = articleDateline.toLocaleDateString("en-us", options);
  //splitIndex returns the index of the space between the date and time
  const splitIndex = formattedDate.lastIndexOf(' ', formattedDate.length - 4);
  //These slices return this part: Aug 01 2017
  if (currentDate.toString().slice(4, 15) ===
    articleDateline.toString().slice(4, 15)) {
    //Returns the "8:08 PM" portion
    return formattedDate.slice(splitIndex + 1);
  } else {
    //Returns the "August 1, 2017" portion
    return formattedDate.slice(0, splitIndex - 1);
  }
};

const slugFinder = (sectionId) => {
  const allSections = store.getState().sections.sections;
  for (sectionIndex in allSections) {
    const sectionObject = allSections [ sectionIndex ];
    if (sectionObject.id === sectionId) {
      return sectionObject.slug;
    }
  }
  console.log("Section ID of requested article doesn't match")
};


export default reducer;