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
      description: "Jason is a web editor for The Spectator.",
      slug: "jason-kao",
    },
    "jason-lin": {
      id: 1,
      firstName: "Jason",
      lastName: "Lin",
      username: "jasonlin",
      email: "jasonlin@gmail.com",
      description: "Jason is a web developer for The Spectator.",
      slug: "jason-lin",
    },
    "cathy-cai": {
      id: 2,
      firstName: "Cathy",
      lastName: "Cai",
      username: "ccai1",
      email: "ccai1@stuy.edu",
      description: "Cathy is a web EIT for The Spectator.",
      slug: "cathy-cai",
    }
  },
  roles: {
    "contributors": {
      id: 0,
      title: "Contributor",
      credentialLevel: 0,
      slug: "contributors",
    },
    "illustrators": {
      id: 1,
      title: "Illustrator",
      credentialLevel: 0,
      slug: "illustrators",
    },
    "photographers": {
      id: 2,
      title: "Photographer",
      credentialLevel: 0,
      slug: "photographers"
    },
  },
  userRoles: [
    {
      userSlug: "jason-kao",
      roleSlug: "contributors",
    },
    {
      userSlug: "jason-lin",
      roleSlug: "contributors",
    },
    {
      userSlug: "cathy-cai",
      roleSlug: "contributors",
    },
    {
      userSlug: "cathy-cai",
      roleSlug: "photographers",
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