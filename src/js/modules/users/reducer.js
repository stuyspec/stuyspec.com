import {
  FETCH_USER_PENDING,
  FETCH_USER_REJECTED,
  FETCH_USER_FULFILLED,
} from "./actionTypes";

const initialState = {
  CONTRIBUTOR_ROLE_ID: 0,
  ILLUSTRATOR_ROLE_ID: 1,
  PHOTOGRAPHER_ROLE_ID: 2,
  isFetching: false,
  isFetched: false,
  error: null,
  users: {},
  roles: {},
  userRoles: [],
};

const reducer = (state = { ...initialState }, action) => {
  switch (action.type) {
    case FETCH_USER_PENDING: {
      return { ...state, isFetching: true };
    }
    case FETCH_USER_FULFILLED: {
      return {
        ...state,
        isFetching: false,
        isFetched: true,
        users: action.payload.reduce((acc, user) => {
          acc[user.id] = user;
          return acc;
        }, {}),
      };
    }
    case FETCH_USER_REJECTED: {
      return { ...state, isFetching: false, error: action.payload };
    }
  }
  return state;
};

export default reducer;
