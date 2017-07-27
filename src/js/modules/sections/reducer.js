import
{
  FETCH_SECTION
} from './actionTypes'

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
    "opinions": {
      id: 1,
      name: "Opinions",
      slug: "opinions",
      description: "The opinions of Stuyvesant.",
      parentSlug: null,
    },
    "features": {
      id: 2,
      name: "Features",
      slug: "features",
      description: "The features of Stuyvesant.",
      parentSlug: null,
    },
    "campaign-coverage": {
      id: 3,
      name: "Campaign Coverage",
      slug: "campaign-coverage",
      description: "The campaign coverage of Stuyvesant.",
      parentSlug: "news",
    },
    "staff-editorials": {
      id: 4,
      name: "Staff Editorials",
      slug: "staff-editorials",
      description: "The staff editorials of Stuyvesant.",
      parentSlug: "opinions",
    },
    "creative-writing": {
      id: 5,
      name: "Creative Writing",
      slug: "creative-writing",
      description: "The creative writing of Stuyvesant.",
      parentSlug: "features",
    },
  },
}

const reducer = (state = { ...initialState }, action) => {
  switch (action.type) {
    case 'sections/FETCH_SECTION_PENDING': {
      return { ...state, isFetching: true }
    }
    case 'sections/FETCH_SECTION_REJECTED': {
      return { ...state, isFetching: false, error: action.payload }
    }
    case 'sections/FETCH_SECTION_FULFILLED': {
      return {
        ...state,
        isFetching: false,
        isFetched: true,
        request: action.payload
      }
    }
  }
  return state;
};

export default reducer