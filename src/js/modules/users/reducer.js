import {
  FETCH_USER_PENDING,
  FETCH_USER_REJECTED,
  FETCH_USER_FULFILLED,
} from './actionTypes';

const initialState = {
  isFetching: false,
  isFetched: false,
  error: null,
  users: {},
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
    },
    {
      userSlug: "nicholas-yang",
      roleSlug: "photographers",
    },
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
        users: {
          ...state.users,
          ...action.payload.reduce((acc, user) => {
            acc[ user.id ] = user;
            return acc;
          }, {}),
        },
      };
    }
  }
  return state;
};

export default reducer;