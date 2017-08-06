import {
  FETCH_ARTICLE_PENDING,
  FETCH_ARTICLE_REJECTED,
  FETCH_ARTICLE_FULFILLED,
} from './actionTypes';
import store from '../../store';
import { getSections } from "../sections/selectors";
import { formatDate } from "../../utils"

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
        articles: action.payload.reduce((accumulator, current) => {
          const articleSlug = current.slug;
          const idOfSection = current.sectionId;
          delete current.sectionId;
          accumulator[ articleSlug ] = {
            ...current,
            dateline: formatDate(current.updatedAt),
            sectionSlug: sectionSlugFinder(idOfSection, action),
          };
          return accumulator;
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

const sectionSlugFinder = (sectionId) => {
  const allSections = getSections(store.getState());
  for (sectionIndex in allSections) {
    const sectionObject = allSections [ sectionIndex ];
    if (sectionObject.id === sectionId) {
      return sectionObject.slug;
    }
  }
  console.error("Section ID of requested article doesn't match")
};


export default reducer;