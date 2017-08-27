import {
  FETCH_USER_PENDING,
  FETCH_USER_REJECTED,
  FETCH_USER_FULFILLED,
} from './actionTypes';

const initialState = {
  CONTRIBUTOR_ROLE_ID: 0,
  ILLUSTRATOR_ROLE_ID: 1,
  PHOTOGRAPHER_ROLE_ID: 2,
  isFetching: false,
  isFetched: false,
  error: null,
  users: {},
  roles: {
    0: {
      id: 0,
      title: "Contributor",
      slug: "contributors",
    },
    1: {
      id: 1,
      title: "Illustrator",
      slug: "illustrators",
    },
    2: {
      id: 2,
      title: "Photographer",
      slug: "photographers"
    },
  },
  userRoles: [
    { userId: 0, roleId: 0 },
    { userId: 1, roleId: 0 },
    { userId: 2, roleId: 0 },
    { userId: 3, roleId: 0 },

    { userId: 0, roleId: 1 },
    { userId: 1, roleId: 1 },
    { userId: 2, roleId: 1 },
    { userId: 3, roleId: 1 },

    { userId: 0, roleId: 2 },
    { userId: 1, roleId: 2 },
    { userId: 2, roleId: 2 },
    { userId: 3, roleId: 2 },
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
        users: action.payload.reduce((acc, user) => {
          acc[ user.id ] = user;
          return acc;
        }, {}),
      };
    }
  }
  return state;
};

export default reducer;