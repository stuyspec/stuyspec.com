import {
  FETCH_USER_PENDING,
  FETCH_USER_REJECTED,
  FETCH_USER_FULFILLED,
} from './actionTypes';

const initialState = {
  isFetching: false,
  isFetched: false,
  error: null,
  request: null,
  users: {
    "jason-kao": {
      id: 0,
      firstName: "Jason",
      lastName: "Kao",
      username: "jkao1",
      email: "jkao1@stuy.edu",
      description: "Jason is a web editor for The Spectator."
    }
  },
  roles: {
    0: {
      id: 0,
      title: "Contributor",
      slug: "contributors",
      credentials: 0
    },
  },
  userRoles: [
    {
      userSlug: "jason-kao",
      roleID: 0
    }
  ],
  authorship: [
    {
      articleSlug: "apples-rain-in-new-york-city",
      userSlug: "jason-kao"
    }
  ]
};

const reducer = (state = { ...initialState }, action) => {
  switch (action.type) {
    case FETCH_USER_PENDING: {
      return { ...state, isFetching: true };
    }
    case FETCH_USER_REJECTED: {
      return { ...state, isFetching: false, error: action.payload };
    }
    case FETCH_USER_FULFILLED: {
      return {
        ...state,
        isFetching: false,
        isFetched: true,
        request: action.payload,
      };
    }
  }
  return state;
};

export default reducer;
